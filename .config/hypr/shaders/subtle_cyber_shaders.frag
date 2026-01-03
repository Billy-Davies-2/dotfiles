precision mediump float;

varying vec2 v_texcoord;
uniform sampler2D tex;
uniform float time;

void main() {
    vec2 coord = v_texcoord - 0.5;
    float dist = length(coord);

    // Enhanced chromatic aberration (color fringing/glitch on edges)
    float aberration = 0.008;  // Increased for more noticeable effect
    vec2 offset = coord * dist * aberration;

    vec3 col;
    col.r = texture2D(tex, v_texcoord + offset).r;
    col.g = texture2D(tex, v_texcoord).g;
    col.b = texture2D(tex, v_texcoord - offset).b;

    // Enhanced vignette (darkens corners for focused HUD vibe)
    float vignette = smoothstep(0.85, 0.15, dist);
    col *= vignette * 1.08;  // Slightly brighter center

    // Subtle horizontal scanlines for CRT monitor effect
    float scanline = sin(v_texcoord.y * 1080.0) * 0.015;
    col -= scanline;

    // Enhanced static noise/grain for digital interference
    float noise = fract(sin(dot(v_texcoord * 150.0, vec2(12.9898, 78.233))) * 43758.5453) * 0.025;
    col += noise;

    // Subtle color shift towards cyan/magenta (cyberpunk palette)
    col.r *= 1.05;  // Boost reds (magenta)
    col.b *= 1.08;  // Boost blues (cyan)
    col.g *= 0.98;  // Slightly reduce green for more neon look

    gl_FragColor = vec4(col, 1.0);
}