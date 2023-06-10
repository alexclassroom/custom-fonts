import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { __ } from '@wordpress/i18n';
import EditLocalFont from "./EditLocalFont";
import EditGoogleFont from "./EditGoogleFont";
import { RangeControl } from "@wordpress/components";
import EditGooglePreviewItem from "./preview/EditGooglePreviewItem";
import EditLocalPreviewItem from "./preview/EditLocalPreviewItem";

const EditFont = ( props ) => {
	const {
		openPopup,
		setOpenPopup,
		font,
		fontName,
		fontType
	} = props;

	const [ open, setOpen ] = useState( openPopup );
	const [ previewSize, setPreviewSize ] = useState( '20' );
	const cancelButtonRef = useRef( null );

	const onCancelClick = () => {
		setOpenPopup( ! openPopup );
	};

	useEffect( () => {
		setOpen( openPopup );
	}, [ openPopup ] );

	return (
		<Transition.Root show={ open } as={ Fragment }>
			<Dialog as="div" className="ast-edit-font__dialog fixed backdrop-blur-sm inset-0 overflow-y-auto" initialFocus={ cancelButtonRef } onClose={ setOpen }>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={ Fragment }
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={ Fragment }
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[65%] sm:max-h-[50%] sm:w-full">
							<div className="bcf-edit-modal-close-wrapper absolute right-[5px] p-1 top-[-2px] width-[20px] height-[10px]">
								<button
									type="button"
									className="mt-3 inline-flex justify-center rounded border shadow-none border-slate-200 padding-[5px] bg-white text-base font-medium text-slate-800 focus:bg-gray-50 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:text-xs bold border-none w-[15px] h-[15px]"
									onClick={ onCancelClick }
									ref={ cancelButtonRef }
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>
								</button>
							</div>

							<div className="grid grid-cols-12 sm:max-h-[650px] overflow-auto">
								<style id={`bcf-font-${font}-preview-size-css`}> {`:root { --bsf-custom-font-size: ${previewSize}px }`} </style>
								<div id="gfont-edit-variation-data" hidden={true}></div>
								<div className="col-span-4 bg-white px-4 pt-5 pb-4 sm:p-6">
									<div>
										{fontType === "local" && <EditLocalFont fontId={font} fontName={fontName} />}
										{fontType === "google" && <EditGoogleFont fontId={font} fontName={fontName} />}
									</div>
								</div>
								<div className="col-span-8 bg-[#F6F7F7] px-4 pt-5 pb-4 sm:p-6">
									<div className="border-b border-light pb-5 flex justify-between items-center">
										<div className="text-sm text-secondary">
											{__('Font preview', 'custom-fonts')}
										</div>
										<div className="w-[314px] pr-[20px]">
											<RangeControl
												className="bcf-font-size-range"
												onChange={(value) => setPreviewSize(value)}
												min={1}
												max={100}
												step={1}
											/>
										</div>
									</div>
									<div className="py-5 divide-y">
										<div className="text-sm text-neutral pb-5">
											<p>
												{__('Font preview will appear here. Please select a font file.', 'custom-fonts')}
											</p>
										</div>
										<div>
											{fontType === "local" && <EditLocalPreviewItem fontId={font} fontName={fontName} />}
											{fontType === "google" && <EditGooglePreviewItem fontId={font} fontName={fontName} />}
										</div>
									</div>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
};

export default EditFont;