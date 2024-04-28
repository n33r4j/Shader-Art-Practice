// Rotating edge lights

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main()
{
    // Normalized pixel coordinates (0,0 at center and edges at 1 and -1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    // Fix the aspect ratio
    uv.x *= u_resolution.x / u_resolution.y;
    
    float freq_a = 0.5;
    float freq_b = 0.5;
    
    float a = sin(u_time * freq_a);
    float b = cos(u_time * freq_b);

    // Output to screen
    gl_FragColor = vec4(uv.x*a, uv.y*b, 0.0,1.0);
    
}