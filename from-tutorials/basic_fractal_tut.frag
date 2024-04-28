// Simple Fractal

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

    vec2 a = uv;
    float speed = 0.1;
    float angle = u_time*speed;
    const float iterations = 64.0;
    float scaling_factor = 1.08;
    
    for(float i = 0.0; i < iterations; i += 1.0)
    {
        a = abs(a);
        a -= 0.5;
        a *= scaling_factor;
        a *= mat2(cos(angle), -sin(angle), 
                sin(angle), cos(angle));
        
    }
    // Output to screen
    gl_FragColor = vec4(length(a), 
                        length(a + vec2(0.3, -0.2)), 
                        length(a + vec2(-0.9, -0.8)), 
                        1.0);
    
}