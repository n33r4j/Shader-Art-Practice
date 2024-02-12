#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution * 2.0 - 1.0;
    // Fix aspect ratio
    uv.x *= u_resolution.x / u_resolution.y;

    float d = length(uv);
    
    gl_FragColor = vec4(u_time * 1.0 - d, cos(u_time) * 0.3, 0.0, 1.0);
}