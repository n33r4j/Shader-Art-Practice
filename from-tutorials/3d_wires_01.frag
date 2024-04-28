#ifdef GL_ES
precision mediump float;
#endif

#define r(a) mat2(cos(a + vec4(0, 33, 11, 0)))

#define s(p) (q = p, \
    d = length(vec2(length(q.xy += 0.5)-0.5, q.z)) - 0.01, \
    q.yx *= r(round((atan(q.y,q.x)-T) * 3.8) / 3.8 + T), \
    q.x -= 0.5, \
    O += (sin(t+T)*0.1 + 0.1)*(1.0*cos(t+T*0.5+vec4(0,1,2,0))) \
    / (0.5 + pow(length(q)*50.0, 1.3)), \
    d)

uniform float u_time;
uniform vec2 u_resolution;

void S(vec3 p)
{
    vec3 q = p;
    float d = length(vec2(length(q.xy += 0.5)-0.5, q.z)) - 0.01;

    
}

void main()
{
    vec3 p, q;
    vec2 R = u_resolution;
    float i, t, d, T = u_time;

    vec3 finalColor = vec3(0.0);

    for( O *= i, F += F - R.xy; i++ < 28.0; 
        p = t * normalize(vec3(F*r(t*0.1), R.y)),
        p.zx *= r(T/4.0), p.zy *= r(T/3.0), p.x += T,
        t += min(min(s( p = fract(p) - 0.5),
            s(vec3(-p.y, p.zx) )),
            s( -p.zxy ))
    );

    gl_FragColor = vec4(finalColor, 1.0);
}