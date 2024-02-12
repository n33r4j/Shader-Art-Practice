#ifdef GL_ES
precision mediump float;
#endif

#define max_iters 6.0 // the depth of the fractal pattern

uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d)
{
    return a + b*cos(2.0*3.141592*(c*t+d));
}

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution * 2.0 - 1.0;
    // Fix aspect ratio
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 uv0 = uv;

    vec3 finalColor = vec3(0.0);

    for(float i = 0.0; i < max_iters; i++)
    {
        uv = fract(uv * 1.5) - 0.5; // I don't completely understand what fract() does
        
        // Params
        vec3 a1 = vec3(0.5, 0.5, 0.5);
        vec3 a2 = vec3(0.5, 0.5, 0.5);
        vec3 a3 = vec3(1.0, 1.0, 1.0);
        vec3 a4 = vec3(0.263, 0.416, 0.557);

        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i*0.4 + u_time*0.4, a1, a2, a3, a4);

        d = sin(d*8.0 + u_time)/8.0;
        d = abs(d);

        d = pow(0.01 / d, 1.8); // Inverse function creates a neon effect. Adjust brightness with pow() exponent value.

        finalColor += col * d;
    }

    // Output
    gl_FragColor = vec4(finalColor, 1.0);
}