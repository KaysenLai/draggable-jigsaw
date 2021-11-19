import Shape from '../shape';

// const foxModel = [
//   new Shape(
//     [
//       { x: 38, y: 0 },
//       { x: 0, y: 12 },
//       { x: 14, y: 104 },
//       { x: 38, y: 185 },
//       { x: 28.5, y: 196.5 },
//       { x: 10, y: 290 },
//       { x: 120, y: 339.5 },
//       { x: 135.5, y: 359 },
//       { x: 143.5, y: 359 },
//       { x: 174.5, y: 374.5 },
//       { x: 204.5, y: 359 },
//       { x: 212, y: 359 },
//       { x: 229, y: 339.5 },
//       { x: 339.5, y: 292.5 },
//       { x: 321, y: 197 },
//       { x: 311.5, y: 185.5 },
//       { x: 336.5, y: 104 },
//       { x: 350.5, y: 12 },
//       { x: 312.5, y: 0 },
//       { x: 223.5, y: 82.5 },
//       { x: 175, y: 74 },
//       { x: 127, y: 82.5 },
//       { x: 38, y: 0 },
//     ],
//     { x: 175.05277704867373, y: 186.45075964883867 },
//     0,
//     {
//       stPoint: { x1: 175.25, y1: 0 },
//       endPoint: { x2: 175.25, y2: 374.5 },
//       colorStops: [
//         [0, '#C4C4C4'],
//         [1, '#C4C4C4'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 31.5, y: 68 },
//       { x: 38, y: 0 },
//       { x: 0, y: 12 },
//       { x: 14, y: 104 },
//       { x: 31.5, y: 68 },
//     ],
//     { x: 19.506060606060608, y: 42.52929292929293 },
//     1,
//     {
//       stPoint: { x1: 19.5, y1: 0 },
//       endPoint: { x2: 19.5, y2: 101.5 },
//       colorStops: [
//         [0, '#B54E3C'],
//         [0.356657, '#F29448'],
//         [1, '#FBB419'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 0.5, y: 68 },
//       { x: 7, y: 0 },
//       { x: 96, y: 82.5 },
//       { x: 73.5, y: 87.5 },
//       { x: 0.5, y: 68 },
//     ],
//     { x: 36.91023516414141, y: 53.338028724747474 },
//     2,
//     {
//       stPoint: { x1: 15.5, y1: 35 },
//       endPoint: { x2: 219.5, y2: 195 },
//       colorStops: [
//         [0, '#F16225'],
//         [1, '#972B45'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 44, y: 79 },
//       { x: 0.5, y: 0 },
//       { x: 73.5, y: 19.5 },
//       { x: 44, y: 79 },
//     ],
//     { x: 39.333333333333336, y: 32.833333333333336 },
//     3,
//     {
//       stPoint: { x1: 0.5, y1: 0 },
//       endPoint: { x2: 56, y2: 54 },
//       colorStops: [
//         [0, '#4A1C55'],
//         [1, '#703B79'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 24, y: 117 },
//       { x: 0, y: 36 },
//       { x: 17.5, y: 0 },
//       { x: 61, y: 79 },
//       { x: 24, y: 117 },
//     ],
//     { x: 27.40173775671406, y: 60.564612954186416 },
//     4,
//     {
//       stPoint: { x1: 13, y1: 24.5 },
//       endPoint: { x2: 72, y2: 133 },
//       colorStops: [
//         [0, '#19CECE'],
//         [1, '#3F80B8'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 47, y: 60 },
//       { x: 76.5, y: 0.5 },
//       { x: 110, y: 56.5 },
//       { x: 94, y: 114.5 },
//       { x: 75.5, y: 114.5 },
//       { x: 28.5, y: 133 },
//       { x: 0.5, y: 109.5 },
//       { x: 10, y: 98 },
//       { x: 47, y: 60 },
//     ],
//     { x: 63.16958980084273, y: 78.41160970456536 },
//     5,
//     {
//       stPoint: { x1: 80, y1: 43 },
//       endPoint: { x2: 32.5, y2: 133 },
//       colorStops: [
//         [0, '#F06020'],
//         [1, '#C22B2C'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 46.5, y: 24 },
//       { x: 18.5, y: 0.5 },
//       { x: 0, y: 94 },
//       { x: 110, y: 143.5 },
//       { x: 110, y: 97.5 },
//       { x: 66, y: 71 },
//       { x: 46.5, y: 24 },
//     ],
//     { x: 50.77088930100352, y: 79.78827033179078 },
//     6,
//     {
//       stPoint: { x1: -4.5, y1: 79.5 },
//       endPoint: { x2: 99.5, y2: 121 },
//       colorStops: [
//         [0, '#C02965'],
//         [1, '#03FEFA'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 36, y: 5 },
//       { x: 0.5, y: 19 },
//       { x: 20, y: 66 },
//       { x: 64, y: 92.5 },
//       { x: 83, y: 22.5 },
//       { x: 75.5, y: 24.5 },
//       { x: 49, y: 24.5 },
//       { x: 36, y: 5 },
//     ],
//     { x: 42.825672551492225, y: 45.31212694409416 },
//     7,
//     {
//       stPoint: { x1: 19, y1: 25.5 },
//       endPoint: { x2: 57, y2: 57 },
//       colorStops: [
//         [0, '#F86A1D'],
//         [1, '#FCA710'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 11.5, y: 0.5 },
//       { x: 0, y: 5 },
//       { x: 13, y: 24.5 },
//       { x: 39.5, y: 24.5 },
//       { x: 47, y: 22.5 },
//       { x: 30, y: 0.5 },
//       { x: 11.5, y: 0.5 },
//     ],
//     { x: 22.790432741049038, y: 12.963875993810362 },
//     8,
//     {
//       stPoint: { x1: 23.5, y1: 0.5 },
//       endPoint: { x2: 20.5, y2: 78 },
//       colorStops: [
//         [0, '#4D1D56'],
//         [1, '#4D1D56'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 0, y: 46.5 },
//       { x: 0, y: 0.5 },
//       { x: 30.5, y: 20 },
//       { x: 38.5, y: 48 },
//       { x: 54.5, y: 53.5 },
//       { x: 54.5, y: 66 },
//       { x: 15.5, y: 66 },
//       { x: 0, y: 46.5 },
//     ],
//     { x: 21.251474116546703, y: 40.07008661705502 },
//     9,
//     {
//       stPoint: { x1: 0.500001, y1: 44.5 },
//       endPoint: { x2: 54.5, y2: 44.5 },
//       colorStops: [
//         [0, '#DFA648'],
//         [1, '#1B78AF'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 55, y: 45.5 },
//       { x: 55, y: 0 },
//       { x: 25, y: 19 },
//       { x: 19, y: 47 },
//       { x: 0.5, y: 52.5 },
//       { x: 0.5, y: 65 },
//       { x: 38, y: 65 },
//       { x: 55, y: 45.5 },
//     ],
//     { x: 33.984206414560504, y: 39.14574227740124 },
//     10,
//     {
//       stPoint: { x1: 55.5, y1: 49.5 },
//       endPoint: { x2: 10, y2: 65 },
//       colorStops: [
//         [0, '#E4A443'],
//         [1, '#1977AA'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 68, y: 50.5 },
//       { x: 36, y: 0 },
//       { x: 0, y: 50.5 },
//       { x: 11.5, y: 140 },
//       { x: 36, y: 134 },
//       { x: 60, y: 140 },
//       { x: 68, y: 50.5 },
//     ],
//     { x: 34.76421513538078, y: 76.83029962477815 },
//     11,
//     {
//       stPoint: { x1: 34.5, y1: 45.5 },
//       endPoint: { x2: 34.5, y2: 121.5 },
//       colorStops: [
//         [0, '#FBB110'],
//         [1, '#F3611C'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 53, y: 99 },
//       { x: 53, y: 0 },
//       { x: 16, y: 69 },
//       { x: 0, y: 127.5 },
//       { x: 17, y: 149.5 },
//       { x: 53, y: 99 },
//     ],
//     { x: 31.200950825165453, y: 84.50287970176761 },
//     12,
//     {
//       stPoint: { x1: 40, y1: 29 },
//       endPoint: { x2: 13, y2: 150 },
//       colorStops: [
//         [0, '#ED6326'],
//         [1, '#8CC040'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 36.5, y: 70 },
//       { x: 0, y: 0 },
//       { x: 0, y: 99 },
//       { x: 32, y: 149.5 },
//       { x: 50.5, y: 125 },
//       { x: 36.5, y: 70 },
//     ],
//     { x: 20.81374067977147, y: 84.43957586908105 },
//     13,
//     {
//       stPoint: { x1: 0.500001, y1: 15 },
//       endPoint: { x2: 41, y2: 141.5 },
//       colorStops: [
//         [0, '#F6611C'],
//         [0.96875, '#89C03F'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 23, y: 8.5 },
//       { x: 0.5, y: 13.5 },
//       { x: 34, y: 69.5 },
//       { x: 71, y: 0 },
//       { x: 23, y: 8.5 },
//     ],
//     { x: 35.12648909867386, y: 27.443863789615644 },
//     14,
//     {
//       stPoint: { x1: 35.75, y1: 0 },
//       endPoint: { x2: 35.5, y2: 51 },
//       colorStops: [
//         [0, '#EF149A'],
//         [1, '#7F1173'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 48.5, y: 8.5 },
//       { x: 71, y: 13.5 },
//       { x: 36.5, y: 70 },
//       { x: 0, y: 0 },
//       { x: 48.5, y: 8.5 },
//     ],
//     { x: 35.87860218615435, y: 27.601330462625594 },
//     15,
//     {
//       stPoint: { x1: 35.5, y1: 0 },
//       endPoint: { x2: 35.5, y2: 46.5 },
//       colorStops: [
//         [0, '#FC0E99'],
//         [1, '#8D1075'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 96, y: 68 },
//       { x: 89.5, y: 0 },
//       { x: 0.5, y: 82.5 },
//       { x: 23, y: 87.5 },
//       { x: 96, y: 68 },
//     ],
//     { x: 59.58976483585859, y: 53.338028724747474 },
//     16,
//     {
//       stPoint: { x1: 96.5, y1: 13 },
//       endPoint: { x2: 48.5, y2: 70 },
//       colorStops: [
//         [0, '#F25E1E'],
//         [1, '#BC2B32'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 37.5, y: 117.5 },
//       { x: 62.5, y: 36 },
//       { x: 45, y: 0 },
//       { x: 0.5, y: 79.5 },
//       { x: 37.5, y: 117.5 },
//     ],
//     { x: 34.5753547691755, y: 60.819441949583855 },
//     19,
//     {
//       stPoint: { x1: 51, y1: 44.5 },
//       endPoint: { x2: -9, y2: 92 },
//       colorStops: [
//         [0, '#15C8CB'],
//         [1, '#3680B3'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 7, y: 68 },
//       { x: 0.5, y: 0 },
//       { x: 38.5, y: 12 },
//       { x: 24.5, y: 104 },
//       { x: 7, y: 68 },
//     ],
//     { x: 18.993939393939392, y: 42.52929292929293 },
//     17,
//     {
//       stPoint: { x1: 19, y1: 0 },
//       endPoint: { x2: 19, y2: 101.5 },
//       colorStops: [
//         [0, '#B54E3C'],
//         [0.356657, '#F29448'],
//         [1, '#FBB419'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 35.5, y: 0 },
//       { x: 51.5, y: 7 },
//       { x: 37, y: 28 },
//       { x: 11, y: 28 },
//       { x: 0, y: 24.5 },
//       { x: 18.5, y: 0 },
//       { x: 35.5, y: 0 },
//     ],
//     { x: 26.29185119574845, y: 14.670652494833186 },
//     21,
//     {
//       stPoint: { x1: 25.75, y1: 1.33612e-7 },
//       endPoint: { x2: 29, y2: 135.5 },
//       colorStops: [
//         [0, '#502058'],
//         [1, '#8B1FA4'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 28.5, y: 79.5 },
//       { x: 73, y: 0 },
//       { x: 0, y: 19.5 },
//       { x: 28.5, y: 79.5 },
//     ],
//     { x: 33.833333333333336, y: 33 },
//     18,
//     {
//       stPoint: { x1: 53.5, y1: 0.00000201415 },
//       endPoint: { x2: -63.5, y2: 119 },
//       colorStops: [
//         [0, '#491C54'],
//         [0.9999, '#84248C'],
//         [1, '#4A1D55'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 63.5, y: 60.5 },
//       { x: 35, y: 0.5 },
//       { x: 0.5, y: 57 },
//       { x: 14.5, y: 112 },
//       { x: 31.5, y: 112 },
//       { x: 81.5, y: 134 },
//       { x: 110, y: 110 },
//       { x: 100.5, y: 98.5 },
//       { x: 63.5, y: 60.5 },
//     ],
//     { x: 47.41862327216684, y: 78.48289324760391 },
//     20,
//     {
//       stPoint: { x1: 25.5, y1: 30.5 },
//       endPoint: { x2: 82.5, y2: 119 },
//       colorStops: [
//         [0, '#F85C20'],
//         [1, '#BC292B'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 51.5, y: 0 },
//       { x: 85.5, y: 15 },
//       { x: 66.5, y: 63.5 },
//       { x: 22, y: 88 },
//       { x: 0, y: 17.5 },
//       { x: 11, y: 21 },
//       { x: 37, y: 21 },
//       { x: 51.5, y: 0 },
//     ],
//     { x: 42.887710125543364, y: 41.42120862084688 },
//     22,
//     {
//       stPoint: { x1: 67.5, y1: 23.5 },
//       endPoint: { x2: 42.5, y2: 44 },
//       colorStops: [
//         [0, '#F4651C'],
//         [1, '#F8A116'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 63.5, y: 24 },
//       { x: 92, y: 0 },
//       { x: 110.5, y: 95.5 },
//       { x: 0, y: 142.5 },
//       { x: 0, y: 97 },
//       { x: 44.5, y: 72.5 },
//       { x: 63.5, y: 24 },
//     ],
//     { x: 59.92805359775198, y: 79.71328254560531 },
//     23,
//     {
//       stPoint: { x1: 110.5, y1: 93 },
//       endPoint: { x2: 23, y2: 107 },
//       colorStops: [
//         [0, '#B72967'],
//         [1, '#02FAFA'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 30, y: 71 },
//       { x: 8, y: 0.5 },
//       { x: 0, y: 90 },
//       { x: 30, y: 71 },
//     ],
//     { x: 12.666666666666668, y: 53.83333333333333 },
//     26,
//     {
//       stPoint: { x1: 30.5, y1: 63.5 },
//       endPoint: { x2: 0.5, y2: 59 },
//       colorStops: [
//         [0, '#C33329'],
//         [1, '#EB551C'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 0.5, y: 0 },
//       { x: 31.5, y: 15.5 },
//       { x: 61.5, y: 0 },
//       { x: 0.5, y: 0 },
//     ],
//     { x: 31.166666666666668, y: 5.166666666666667 },
//     24,
//     {
//       stPoint: { x1: 14, y1: 8 },
//       endPoint: { x2: 44.5, y2: 8 },
//       colorStops: [
//         [0, '#9B3877'],
//         [1, '#4FA1BD'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 0, y: 70.5 },
//       { x: 19, y: 0.5 },
//       { x: 30.5, y: 90 },
//       { x: 0, y: 70.5 },
//     ],
//     { x: 16.5, y: 53.66666666666667 },
//     25,
//     {
//       stPoint: { x1: 0.500001, y1: 73 },
//       endPoint: { x2: 30.5, y2: 62 },
//       colorStops: [
//         [0, '#CA332A'],
//         [1, '#E46328'],
//       ],
//     },
//   ),
//
//   new Shape(
//     [
//       { x: 0.5, y: 6 },
//       { x: 25, y: 0 },
//       { x: 49, y: 6 },
//       { x: 43, y: 34 },
//       { x: 24.5, y: 39.5 },
//       { x: 8.5, y: 34 },
//       { x: 0.5, y: 6 },
//     ],
//     { x: 25.18911370591556, y: 18.758906022521316 },
//     27,
//     {
//       stPoint: { x1: 24.5, y1: 8.5 },
//       endPoint: { x2: 24.75, y2: 39.5 },
//       colorStops: [
//         [0, '#8DC265'],
//         [1, '#60895E'],
//       ],
//     },
//   ),
// ];
const foxModel = [
  new Shape(
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 100 },
      { x: 0, y: 100 },
    ],
    { x: 0, y: 0 },
    0,
    {
      stPoint: { x1: 175.25, y1: 0 },
      endPoint: { x2: 175.25, y2: 374.5 },
      colorStops: [
        [0, '#C4C4C4'],
        [1, '#C4C4C4'],
      ],
    },
  ),
  new Shape(
    [
      { x: 10, y: 0 },
      { x: 1110, y: 0 },
      { x: 1090, y: 100 },
      { x: 10, y: 100 },
    ],
    { x: 0, y: 0 },
    0,
    {
      stPoint: { x1: 175.25, y1: 0 },
      endPoint: { x2: 175.25, y2: 374.5 },
      colorStops: [
        [0, '#C4C4C4'],
        [1, '#C4C4C4'],
      ],
    },
  ),
];
export default foxModel;
