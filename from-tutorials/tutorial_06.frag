// Converting an Image Texture to Black and White

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

    vec4 col = texture2D(background, new_pos*0.5 + 0.5);

    // Look at the leftmost edge of the color picker square. It has the
    // white-to-black gradient for all colors, and all 3(r,g,b) values 
    // are same.
    float brightness = 1.0; // 1.0 -> normal, less than 1.0 -> dimmer, greater than 1.0 -> brighter
    float avg = brightness * (col.r + col.g + col.b) / 3.0;

    // Output to screen
    gl_FragColor = vec4(avg, avg, avg, 1.0);
    
}