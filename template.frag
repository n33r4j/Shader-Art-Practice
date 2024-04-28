// Template

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
    
    float a = sin(u_time * 0.5);

    // Output to screen
    gl_FragColor = vec4(a, a, 1.0 ,1.0);
    
}