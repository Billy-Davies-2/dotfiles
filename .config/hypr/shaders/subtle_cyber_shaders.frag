precision mediump float;

varying vec2 v_texcoord;
uniform sampler2D tex;

void main() {
    vec2 coord = v_texcoord - 0.5;
    float dist = length(coord);

    // Very subtle chromatic aberration (color fringing/glitch on edges)
    float aberration = 0.005;  // Tweak: 0.002 (almost invisible) to 0.012 (stronger)
    vec2 offset = coord * dist * aberration;

    vec3 col;
    col.r = texture2D(tex, v_texcoord + offset).r;
    col.g = texture2D(tex, v_texcoord).g;
    col.b = texture2D(tex, v_texcoord - offset).b;

    // Soft vignette (darkens corners for focused HUD vibe)
    float vignette = smoothstep(0.8, 0.2, dist);
    col *= vignette * 1.03;

    // Optional subtle static noise/grain (uncomment for faint digital interference)
    float noise = fract(sin(dot(v_texcoord * 100.0, vec2(12.9898, 78.233))) * 43758.5453) * 0.02;
    col += noise;

    gl_FragColor = vec4(col, 1.0);
}