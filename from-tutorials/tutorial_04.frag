// simple gradients animated

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

    // Sine wave
    float slope = 0.4;
    // I don't think this changes the direction of movement though.
    float c = (sin((slope*uv.x - uv.y) * 16.0 + u_time/0.3) + 1.0)/ 2.0;

    // Output to screen
    gl_FragColor = vec4(c, 0.0, 1.0, 1.0);
    
}