import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';
import { useSelector } from 'react-redux';

const EditGoogleVariationItem = ({
	id,
	variation
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
		<div key={id} className={`text-sm text-heading mt-3.5 edit-gfont-variation-item`} data-varweight={variation}>
			{
				getFontWeightTitle(variation)
			}
		</div>
	);
};

const EditGoogleFont = ({fontId, fontName}) => {
	const restAllData = useSelector( ( state ) => state.fonts );
	const editFontId = parseInt( fontId );

	let toBeEditFont = {};
	let variations = null;
	restAllData.forEach(function(individualFont) {
		if ( editFontId === individualFont.id ) {
			const gFontData = bsf_custom_fonts_admin.googleFonts[individualFont.title];
			variations = gFontData[0] ? gFontData[0] : [];
			toBeEditFont = individualFont;
		}
	});

	let editingFontData = {};
	if ( undefined === toBeEditFont['fonts-data'] || ! toBeEditFont['fonts-data'].length ) {
		editingFontData = toBeEditFont['fonts-data'];
	}

	const [editFontData, setEditGoogleFontData] = useState( editingFontData );
	const [ isLoading, setLoading ] = useState( false );

	const updatingNewFontPost = ( e ) => {
		console.log( '***** Editing New Font *****' );
		e.preventDefault();

		setLoading( 'loading' );
		const formData = new window.FormData();
		const editFontStringifiedData = document.getElementById('gfont-edit-variation-data').innerHTML;

		formData.append( 'action', 'bcf_edit_font' );
		formData.append( 'security', bsf_custom_fonts_admin.edit_font_nonce );
		formData.append( 'font_type', 'google' );
		formData.append( 'font_id', fontId );
		formData.append( 'font_data', editFontStringifiedData );

		apiFetch( {
			url: bsf_custom_fonts_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( (response) => {
			if ( response.success ) {
				setTimeout( () => {
					window.location = `${ bsf_custom_fonts_admin.app_base_url }`;
				}, 500 );
			}
			setLoading( false );
		} );
	};

	return (
		<div>
			<div>
				<p className="mb-5 text-xl font-semibold">
					{__( 'Edit Font', 'custom-fonts' )}
				</p>

				<div className="my-5 border border-light rounded-sm p-3.5">
					<h3 className="text-sm font-semibold text-heading">
						{__('Selected Variant', 'custom-fonts')}
					</h3>
					<div className="flex flex-col gap-y-3.5">
						<div className="gvariations-wrapper">
							{variations.map((variation) => (
								<EditGoogleVariationItem
									key={variation}
									variation={variation}
								/>
							))}
						</div>
					</div>
				</div>

				<div className="my-5">
					<button
						type="button"
						className="inline-flex px-4 py-2 border border-transparent text-sm shadow-sm text-white bg-primary focus-visible:bg-primaryDark hover:bg-primaryDark focus:outline-none"
						onClick={ updatingNewFontPost }
					>
						{__( 'Save Font', 'custom-fonts' )}
						{ 'loading' === isLoading && (
							<svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						) }
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditGoogleFont;
