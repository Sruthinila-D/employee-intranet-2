import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import Aura from '@primeuix/themes/aura';

/* =========================
   PRIMITIVE PALETTES
========================= */
const brandPrimary = {
  50: '#e6f2f0',
  100: '#b3d9d3',
  200: '#80c0b6',
  300: '#4da799',
  400: '#1a8e7c',
  500: '#005c4d',
  600: '#005345',
  700: '#00453a',
  800: '#00362e',
  900: '#002822',
  950: '#001a17',
};

const brandSlate = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
};

/* =========================
   HELPER MAPS
========================= */
const brandPrimaryMap = {
  50: '{brandPrimary.50}',
  100: '{brandPrimary.100}',
  200: '{brandPrimary.200}',
  300: '{brandPrimary.300}',
  400: '{brandPrimary.400}',
  500: '{brandPrimary.500}',
  600: '{brandPrimary.600}',
  700: '{brandPrimary.700}',
  800: '{brandPrimary.800}',
  900: '{brandPrimary.900}',
  950: '{brandPrimary.950}',
};

const brandSlateMap = {
  50: '{brandSlate.50}',
  100: '{brandSlate.100}',
  200: '{brandSlate.200}',
  300: '{brandSlate.300}',
  400: '{brandSlate.400}',
  500: '{brandSlate.500}',
  600: '{brandSlate.600}',
  700: '{brandSlate.700}',
  800: '{brandSlate.800}',
  900: '{brandSlate.900}',
  950: '{brandSlate.950}',
};

/* =========================
   BRAND PRESET (LIGHT)
========================= */
const brandPreset = definePreset(Aura, {
  primitive: {
    brandPrimary,
    brandSlate,
  },

  semantic: {
    primary: brandPrimaryMap,
    secondary: brandSlateMap,

    borderRadius: {
      medium: '6px',
    },

    focusRing: {
      width: '2px',
      color: '{primary.500}',
      offset: '1px',
    },

    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
        },

        /* 🔥 THIS FIXES OUTLINED BUTTONS */
        secondary: {
          color: '{secondary.600}', // icon + text
          hoverColor: '{secondary.700}',
          activeColor: '{secondary.800}',
        },

        selectButton: {
          button: {
            checked: {
              background: '{primary.500}',
              color: '#ffffff',
              borderColor: '{primary.500}',
            },
            checkedHover: {
              background: '{primary.600}',
              borderColor: '{primary.600}',
            },
          },
        },

        highlight: {
          background: '{primary.500}',
          focusBackground: '{primary.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },

        surface: {
          0: '#ffffff',
          50: '{brandSlate.50}',
          100: '{brandSlate.100}',
          200: '{brandSlate.200}',
          300: '{brandSlate.300}',
          400: '{brandSlate.400}',
          500: '{brandSlate.500}',
          600: '{brandSlate.600}',
          700: '{brandSlate.700}',
          800: '{brandSlate.800}',
          900: '{brandSlate.900}',
          950: '{brandSlate.950}',
        },
      },
    },
  },
});

export default brandPreset;

// import { definePreset } from '@primeuix/themes';
// import Aura from '@primeuix/themes/aura';

// /* ==========================================================================
//    1. PRIMITIVES (Your Raw Brand Colors)
//    ========================================================================== */
// const brandPrimary = {
//     50: '#e6f2f0',
//     100: '#b3d9d3',
//     200: '#80c0b6',
//     300: '#4da799',
//     400: '#1a8e7c',
//     500: '#005c4d',
//     600: '#005345',
//     700: '#00453a',
//     800: '#00362e',
//     900: '#002822',
//     950: '#001a17'
// };

// const brandSlate = {
//     50: '#f8fafc',
//     100: '#f1f5f9',
//     200: '#e2e8f0',
//     300: '#cbd5e1',
//     400: '#94a3b8',
//     500: '#64748b',
//     600: '#475569',
//     700: '#334155',
//     800: '#1e293b',
//     900: '#0f172a',
//     950: '#020617'
// };

// /* ==========================================================================
//    2. PRESET DEFINITION
//    ========================================================================== */
// const brandPreset = definePreset(Aura, {
//     primitive: {
//         brandPrimary,
//         brandSlate
//     },

//     /*
//        SEMANTIC LAYER
//        This automatically populates variables like:
//        --p-button-primary-background -> {primary.color}
//        --p-button-root-border-radius -> {borderRadius.medium}
//     */
//     semantic: {
//         primary: {
//             50: '{brandPrimary.50}',
//             100: '{brandPrimary.100}',
//             200: '{brandPrimary.200}',
//             300: '{brandPrimary.300}',
//             400: '{brandPrimary.400}',
//             500: '{brandPrimary.500}',
//             600: '{brandPrimary.600}',
//             700: '{brandPrimary.700}',
//             800: '{brandPrimary.800}',
//             900: '{brandPrimary.900}',
//             950: '{brandPrimary.950}'
//         },

//         // Global Border Radius (Affects buttons, inputs, cards)
//         borderRadius: {
//             small: '4px',
//             medium: '6px', // Maps to --p-button-border-radius by default
//             large: '8px',
//             xlarge: '12px'
//         },

//         focusRing: {
//             width: '2px',
//             style: 'solid',
//             color: '{brandPrimary.500}',
//             offset: '2px',
//             shadow: 'none'
//         },

//         colorScheme: {
//             light: {
//                 surface: {
//                     0: '#ffffff',
//                     50: '{brandSlate.50}',
//                     100: '{brandSlate.100}',
//                     200: '{brandSlate.200}',
//                     300: '{brandSlate.300}',
//                     400: '{brandSlate.400}',
//                     500: '{brandSlate.500}',
//                     600: '{brandSlate.600}',
//                     700: '{brandSlate.700}',
//                     800: '{brandSlate.800}',
//                     900: '{brandSlate.900}',
//                     950: '{brandSlate.950}'
//                 },

//                 // This controls --p-button-primary-background and text colors
//                 primary: {
//                     color: '{brandPrimary.500}',
//                     inverseColor: '#ffffff',
//                     hoverColor: '{brandPrimary.600}',
//                     activeColor: '{brandPrimary.700}'
//                 },

//                 // This controls --p-button-secondary-color / outlined buttons
//                 text: {
//                     color: '{brandSlate.900}',
//                     hoverColor: '{brandSlate.800}',
//                     mutedColor: '{brandSlate.500}',
//                     colorSecondary: '{brandSlate.600}'
//                 },

//                 // Form controls (Inputs, Checkboxes)
//                 formField: {
//                     background: '{surface.0}',
//                     borderColor: '{surface.300}',
//                     hoverBorderColor: '{brandPrimary.400}',
//                     focusBorderColor: '{brandPrimary.500}',
//                     color: '{text.color}'
//                 }
//             }
//         }
//     },

//     /*
//        COMPONENT LAYER (Optional Overrides)
//        Here we strictly map the tokens you listed if you want to override the Semantic defaults.
//     */
//     components: {
//         button: {
//             colorScheme: {
//                 light: {
//                     root: {
//                         primary: {
//                             // Example: Mapping your list variables to semantic values
//                             background: '{primary.color}',
//                             hoverBackground: '{primary.hoverColor}',
//                             activeBackground: '{primary.activeColor}',
//                             color: '{primary.inverseColor}'
//                         },
//                         secondary: {
//                             background: '{surface.100}',
//                             hoverBackground: '{surface.200}',
//                             activeBackground: '{surface.300}',
//                             color: '{text.color}'
//                         }
//                     }
//                 }
//             },
//         }
//     }
// });

// export default brandPreset;
