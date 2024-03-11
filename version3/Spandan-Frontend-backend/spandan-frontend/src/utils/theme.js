// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react'
import "@fontsource/vt323";

const fonts = {
    heading: 'vt323, monospace',
    body: 'vt323, monospace',
    mono: `vt323, monospace`,
};

const theme = extendTheme({
    fonts,
    fontWeights: {
        normal: 400,
        bold: 700,
    },
    styles: {
        global: {
            h1: {
                fontWeight: "bold",
                fontSize: "2.5rem",
                lineHeight: "3rem",
            },
            h2: {
                fontWeight: "bold",
                fontSize: "2rem",
                lineHeight: "2.5rem",
            },
            h3: {
                fontWeight: "bold",
                fontSize: "1.5rem",
                lineHeight: "2rem",
            },
            h4: {
                fontWeight: "bold",
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
            },
            h5: {
                fontWeight: "bold",
                fontSize: "1rem",
                lineHeight: "1.5rem",
            },
            h6: {
                fontWeight: "bold",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
            },
        },
    },
    layerStyles: {
        floating: {
            mb: '4',
            borderRadius: '0',
            borderWidth: '4px',
            borderColor: 'black',
            bgColor: 'white',
        }
    },
    components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {
                fontWeight: 'semibold', // Normally, it is "semibold"
            },
            sizes: {
                xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },
            // 3. We can add a new visual variant
            variants: {
                'with-shadow': {
                    bg: 'red.400',
                    boxShadow: '0 0 2px 2px #efdfde',
                },
                // 4. We can override existing variants
                solid: (props) => ({
                    bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
                }),
                // 5. We can add responsive variants
                sm: {
                    bg: 'teal.500',
                    fontSize: 'md',
                },

                'custom': {
                    bg: "white",
                    color: "black",
                    _hover: {
                        bgGradient: "linear(to-r, yellow, yellow)",
                        boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
                    },
                    borderWidth: "2px",
                    borderColor: "black",
                    borderRadius: "none"
                },

            },
            // 6. We can overwrite defaultProps
            defaultProps: {
                size: 'md', // default is md
                variant: 'solid', // default is solid
                colorScheme: 'gray', // default is gray
            },
        },
    },
})

export default theme