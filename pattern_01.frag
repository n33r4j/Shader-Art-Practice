// Concentric circles that eventually turn into an 8 pointed spider web thingy.

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

    float d = length(uv);
    d = sin(u_time * d * 8.0);
    d = abs(d);
    
    d = step(0.3, d);
    
    // Output to screen
    gl_FragColor = vec4(d, 0.3, 0.0 ,1.0);
    
}