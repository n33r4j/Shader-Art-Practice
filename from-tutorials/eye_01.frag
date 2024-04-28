// Eye
// https://www.youtube.com/watch?v=emjuqqyq_qc

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

// Rotation matrix
const mat2 m = mat2(0.80, 0.60, -0.60, 0.80);

float hash(float n)
{
    return fract(sin(n)*43758.5453);
}

float noise( in vec2 x)
{
    vec2 i = floor(x);
    vec2 f = fract(x);
    
    f = f*f*(3.0-2.0*f);

    float n = i.x + i.y*57.0;

    return mix( mix(hash(n+ 0.0), hash(n+ 1.0), f.x), 
                mix(hash(n+57.0), hash(n+58.0), f.x), f.y);
}

// Fractional Brownian Motion
float fbm (vec2 p)
{
    float f = 0.0;
    f += 0.50000*noise(p); p = m*p*2.02;
    f += 0.25000*noise(p); p = m*p*2.03;
    f += 0.12500*noise(p); p = m*p*2.01;
    f += 0.06250*noise(p); p = m*p*2.04;
    f += 0.03125*noise(p);
    return f/0.984375;
}

void main()
{
    // Normalized pixel coordinates (0,0 at center and edges at 1 and -1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;
    
    // float f = noise(1.0* uv);
    //float f = fbm(4.0* uv);

    uv.x -= 0.0; // If you want to translate the eye
    
    // Polar Coordinates
    float r = sqrt(dot(uv, uv));
    float a = atan(uv.y, uv.x);

    vec3 col = vec3(1.0);

    float ss = 0.5 + 0.5*sin(3.0*u_time);
    float anim = 1.0 * 0.5*ss*clamp(1.0 - r, 0.0, 1.0);
    r *= 1.0 - anim;

    if (r < 0.8)
    {
        col = vec3(0.0, 0.3, 0.4);

        float f = fbm(5.0*uv);
        col = mix(col, vec3(0.1137, 0.7804, 0.702), f);

        f = 1.0 - smoothstep(0.2, 0.5, r);
        col = mix(col, vec3(0.9, 0.6, 0.2), f);

        // Domain Distortion (no wonder this is called sorcery)
        a += 0.05*fbm(20.0 * uv);

        f = smoothstep(0.3, 1.0, fbm(vec2(6.0*r,20.0*a)));
        col = mix(col, vec3(1.0), f);

        f = smoothstep(0.4, 0.9, fbm(vec2(10.0*r, 15.0*a)));
        col *= 1.0 - 0.5*f;

        f = smoothstep(0.6, 0.8, r);
        col *= 1.0 - 0.5*f;

        f = smoothstep(0.2, 0.25, r);
        col *= f;

        // Fake reflection(the white circle)
        f = 1.0 - smoothstep(0.0, 0.5, length(uv - vec2(0.24,0.2)));
        col += vec3(1.0, 0.9, 0.8)*f*0.9;

        // Antialias the edges
        f = smoothstep(0.75, 0.8, r);
        col = mix(col, vec3(1.0), f);
    }

    // Output to screen
    gl_FragColor = vec4(col,1.0);
    
}