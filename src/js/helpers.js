// function rgb2hex(rgb) {
//     rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//     function hex(x) {
//       return ("0" + parseInt(x).toString(16)).slice(-2);
//     }
//     return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
//   }
  
// function hex2rgb(hex) {
//     hex = hex.replace("#", "");
//     let r = parseInt(hex.substring(0, 2), 16),
//         g = parseInt(hex.substring(2, 4), 16),
//         b = parseInt(hex.substring(4, 6), 16);

//     return `rgb(${r}, ${g}, ${b})`;
// }
  
export function extractRGBTuple(rgb) {
    return `(${rgb.match(/\d+/g).join(", ")})`;
}

// function extractRGBTupleFromHex(hex) {
//     return extractRGBTuple(hex2rgb(hex));
// }