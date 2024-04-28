// Loading an Image Texture and Applying a Simple Tiling Effect

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

// You can load images like so
uniform sampler2D background; // park.jpg

void main()
{
    // Normalized pixel coordinates (0,0 at center and edges at 1 and -1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;
    
    // To flip the image
    vec2 new_pos = uv;
    // new_pos.y = 1.0 - uv.y;
    float f = pow(2.0, 7.0); // powers of 2 give it a tiled look
    new_pos = new_pos + (sin(new_pos * f)/f);

    vec4 col = texture2D(background, new_pos*0.5 + 0.5);

    // Output to screen
    gl_FragColor = vec4(col);
    
}