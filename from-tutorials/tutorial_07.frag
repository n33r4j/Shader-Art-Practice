// Signed Distance Functions (SDFs)
// https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas#uniforms

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

const int num_circles = 100;
uniform vec3 circles[num_circles];


void main()
{
    // Normalized pixel coordinates (0,0 at center and edges at 1 and -1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;
    
    float color = 1.0;
    for(int i = 0; i < num_circles ; i++)
    {
        float d = length(uv - circles[i].xy) - circles[i].z;
        d = step(0.0, d);
        color *= d;
    }
    // vec3 circle = vec3(0.0, 0.0, 0.3); //x,y = pos,  z = radius(0.3)
    // float d = length(uv - circle.xy) - circle.z;

    //d = step(0.0, d);
    // d = smoothstep(0.0, 0.01, d);

    // Output to screen
    gl_FragColor = vec4( color, color, color, 1.0);
    
}