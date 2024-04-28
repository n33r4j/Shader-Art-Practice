// simple gradients

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main()
{
    // Normalized pixel coordinates (0,0 at center and edges at 1 and -1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    // // 1D gradient using mix()
    // vec4 color1 = vec4(0.5, 0.1, 0.9, 1.0);
    // vec4 color2 = vec4(0.1, 0.8, 0.7, 1.0);

    // vec4 c1 = mix(color1, color2, uv.y);

    // 2D gradient using mix()
    vec4 topleft = vec4(0.5, 0.1, 0.9, 1.0);
    vec4 topright = vec4(0.3, 1.0, 0.8, 1.0);
    vec4 bottomleft = vec4(0.8, 0.6, 0.1, 1.0);
    vec4 bottomright = vec4(0.7, 0.1, 0.2, 1.0);

    vec4 top = mix(topleft, topright, uv.x);
    vec4 bottom = mix(bottomleft, bottomright, uv.x);

    vec4 c2 = mix(bottom, top, uv.y);

    // Output to screen
    gl_FragColor = vec4(c2);
    
}