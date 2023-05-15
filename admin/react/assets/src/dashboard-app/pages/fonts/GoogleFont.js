import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { __ } from "@wordpress/i18n";
import { useSelector } from 'react-redux';

const GoogleVariationItem = ({
	id,
	variation,
	handleVariationRemove
}) => {
	const getFontWeightTitle = ( weight ) => {
		switch ( weight ) {
			case '100':
				return __( 'Thin ', 'custom-fonts' ) + weight;
			case '200':
				return __( 'Extra Light ', 'custom-fonts' ) + weight;
			case '300':
				return __( 'Light ', 'custom-fonts' ) + weight;
			case '400':
				return __( 'Regular ', 'custom-fonts' ) + weight;
			case '500':
				return __( 'Medium ', 'custom-fonts' ) + weight;
			case '600':
				return __( 'Semi Bold ', 'custom-fonts' ) + weight;
			case '700':
				return __( 'Bold ', 'custom-fonts' ) + weight;
			case '800':
				return __( 'Extra Bold ', 'custom-fonts' ) + weight;
			case '900':
				return __( 'Black ', 'custom-fonts' ) + weight;
			default:
				return __( 'Weight ', 'custom-fonts' ) + weight;
		}
	}

	return (
		<div className="my-5 border border-light rounded-sm p-3.5">
			<h3 className="text-sm font-semibold text-heading">
				{__('Selected Variant', 'custom-fonts')}
			</h3>
			<div className="mt-3.5 flex flex-col gap-y-3.5">
				<div className="flex items-center justify-between">
					<div className="text-sm text-heading">
						{
							getFontWeightTitle(variation.font_weight)
						}
					</div>
					<div>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							onClick={() =>
								handleVariationRemove(variation.id)
							}
						>
							<path
								d="M8.00078 0.800049C4.00078 0.800049 0.800781 4.00005 0.800781 8.00005C0.800781 12 4.00078 15.2 8.00078 15.2C12.0008 15.2 15.2008 12 15.2008 8.00005C15.2008 4.00005 12.0008 0.800049 8.00078 0.800049ZM8.00078 13.6C4.88078 13.6 2.40078 11.12 2.40078 8.00005C2.40078 4.88005 4.88078 2.40005 8.00078 2.40005C11.1208 2.40005 13.6008 4.88005 13.6008 8.00005C13.6008 11.12 11.1208 13.6 8.00078 13.6ZM4.80078 7.20005V8.80005H11.2008V7.20005H4.80078Z"
								fill="#007CBA"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};


const GoogleFont = () => {
	const googleFontData = useSelector( ( state ) => state.googleFont );

	const googleFonts = bsf_custom_fonts_admin.googleFonts;
	const dispatch = useDispatch();
	const [gFont, setGFont] = useState('');

	function handleGoogleFontChange( e ) {
		setGFont( e.target.value );

		const changeEvent = new CustomEvent( 'bcf:googleFontSelection:change', {
			bubbles: true,
			detail: { e, name: e.target.name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );
		dispatch( { type: 'SET_GOOGLE_FONT', payload: {
			"font_name": e.target.value,
			"font_fallback": '',
			"font_display": '',
			"variations": []
		} } );
	}

	const handleVariationRemove = (id) => {
		const updatedVariations = googleFontData.variations.filter(
			(variation) => variation.id !== id
		);

		dispatch( { type: 'SET_GOOGLE_FONT', payload: {
			"font_name": googleFontData.font_name ? googleFontData.font_name : '',
			"font_fallback": googleFontData.font_fallback ? googleFontData.font_fallback : '',
			"font_display": googleFontData.font_display ? googleFontData.font_display : '',
			"variations": updatedVariations
		} } );
	};

	return (
		<div>
			<div>
				<p className="mb-5">
					{__('Add Google fonts assets and font face definitions to your currently active theme', 'custom-fonts')}
				</p>
				<div>
					<label className="w-full text-sm text-heading" htmlFor="">
						{__('Select font', 'custom-fonts')}
					</label>
					<div className="mt-1.5">
						<select
							className="w-full"
							name="bcf-google-font-selection"
							id="bcf-google-font-selection"
							value={gFont}
							onChange={handleGoogleFontChange}
						>
							<option value=''> {__('Select a font family...', 'custom-fonts')} </option>
							{Object.keys(googleFonts).map((key) => (
								<option value={key} key={key}>{key}</option>
							))}
						</select>
					</div>
				</div>
				{(googleFontData && googleFontData.variations) && googleFontData.variations.map((variation) => (
					<GoogleVariationItem
						key={variation.id+1}
						variation={variation}
						handleVariationRemove={handleVariationRemove}
					/>
				))}
				<div className="my-5">
					<button className="button button-primary"> {__('Save Font', 'custom-fonts')} </button>
				</div>
			</div>
		</div>
	);
};

export default GoogleFont;
