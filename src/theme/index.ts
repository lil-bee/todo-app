import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	fonts: {
		heading: '"Plus Jakarta Sans", sans-serif',
		body: '"Plus Jakarta Sans", sans-serif',
	},
	components: {
		Input: {
			defaultProps: {
				size: "md",
			},
		},
		Checkbox: {
			defaultProps: {
				size: "lg",
			},
		},
		Button: {
			baseStyles: {
				boxShadow: "0px 2px 6px 0px rgba(127, 177, 243, 0.40)",
			},
			variants: {
				"primary-button": {
					bg: "#2F80ED",
					color: "white",

					_hover: {
						bg: "#1E70D8", // Warna latar belakang saat dihover
					},
				},
				"danger-button": {
					bg: "#EB5757",
					color: "white",
				},
			},
			defaultProps: {
				size: "md",
				variants: "primary-button",
			},
		},
		IconButton: {
			variants: {
				"delete-button": {
					bg: "transparent",
					colorScheme: "red",
				},
			},
		},
	},
});

export default theme;
