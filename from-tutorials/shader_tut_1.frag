// GLSL Shader Tutorials

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // // Normalized pixel coordinates (from 0 to 1)
    // vec2 uv = fragCoord/iResolution.xy;
    // // Center origin
    // uv -= 0.5;
    // // Normalize i.e. instead of (-0.5,-0.5) to (0.5,-0.5), we make it
    // (-1, -1) to (1, -1)
    // uv *= 2.0;
    
    // Combine all previous operations
    vec2 uv = fragCoord/iResolution.xy * 2.0 - 1.0;

    
    // Swizzling:
    // uv.xyx = (uv.x, uv.y, uv.x) [vec3]type
    // uv.zyx = (uv.z, uv.y, uv.x) [vec3]type
    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
    
}