// simple gradients with repeating pattern

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

    // Repeating pattern
    vec2 newPos = fract(uv * 10.0);
    /*
    The fract() function returns the decimal part of a number.
    */

    // Output to screen
    gl_FragColor = vec4(newPos, 1.0, 1.0);
    
}