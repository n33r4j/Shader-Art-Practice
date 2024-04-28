// 

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

// ^
// |
// Y
//  X -->

// Note: thickness is just a scaling factor and not an exact measurement.
// Diagonal line
// abs(uv.x - uv.y) < thickness
// Horizontal line
// (uv.y > pos-thickness && uv.y < pos+thickness)
// Vertical line
// (uv.x > pos-thickness && uv.x < pos+thickness)


void main()
{
    // Normalized pixel coordinates (0,0 at center and edges at 1 and -1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    // Fix the aspect ratio
    uv.x *= u_resolution.x / u_resolution.y;
    
    float c = 1.0;
    float slope = 1.0;
    float thickness = 0.01;

    bool line_1 = ((uv.y - u_time*uv.x*slope > -thickness/2.0) && (uv.y - u_time*uv.x*-slope < thickness/2.0));
    bool line_2 = ((uv.y - u_time*uv.x*slope > -thickness/2.0) && (uv.y - u_time*uv.x*-slope < thickness/2.0));
    
    if( line_1 || line_2)
    {
        c = 0.0;
    }

    // Output to screen
    gl_FragColor = vec4(c, c, c,1.0);
    
}