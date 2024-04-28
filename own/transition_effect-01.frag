// transition effect #1

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

float rect(vec2 pt, vec2 size, vec2 center)
{
    // return 1 if in box and 0 otherwise
    vec2 halfsize = size * 0.5;
    vec2 p = pt - center;
    // step(edge, x) => 0.0 is returned if x < edge and 1.0 otherwise.
    float horz = step(-halfsize.x, p.x) - step(halfsize.x, p.x);
    float vert = step(-halfsize.y, p.y) - step(halfsize.y, p.y);
    return horz * vert;
}

mat2 getRotationMatrix(float theta)
{
    float s = sin(theta);
    float c = cos(theta);
    return mat2(c, -s, s, c);
}

void main()
{
    // Normalized pixel coordinates (0,0 at center and edges at 1 and -1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    // Fix the aspect ratio
    uv.x *= u_resolution.x / u_resolution.y;
    
    float tilecount = 60.0; // Adjust this for no. of tiny blocks <---
    vec2 center = vec2(0.5);
    float speed = 0.5;
    mat2 mat = getRotationMatrix(u_time * speed);

    // What does fract() do?
    // -> It returns the fractional part of a number. e.g. frac(8.3) = 0.3, frac(1.8) = 0.8
    // How does this help us with tiling?
    // -> Basically, it results in a repeating pattern for the coordinates. For example,
    // if the coordinates along an axis is 0 to 1, and you take the fract(coord*tilecount),
    // the coordinates would now be 0 to 1, 0 to 1, ... 6 times.
    vec2 p = fract(uv * tilecount); // fractional coordinates
    vec2 pt = mat * p;
    // vec2 pt = (mat * (p-center)) + center;
    float inRect = rect(pt, vec2(0.5), center);
    vec3 color =  vec3(1.0, 1.0, 0.0) * inRect;

    // Output to screen
    gl_FragColor = vec4(color,1.0);
    
}