import { FSCheckout, CheckoutOptions } from 'freemius-checkout-js';
import { useState, useEffect } from 'react';
export const checkoutConfig: CheckoutOptions = {

	// plugin_id: process.env.REACT_APP_PLUGIN_ID as string,
	// public_key: process.env.REACT_APP_PUBLIC_KEY as string,
	
	plugin_id: '10110',
	public_key: 'pk_a7a35bf99c62e8a3ce09ea0d00527',
};

export function useFsCheckout() {
	// create a FSCheckout instance once
	const [fsCheckout] = useState<FSCheckout>(
		() => new FSCheckout(checkoutConfig)
	);
	useEffect(() => {
		// close and destroy the DOM related stuff on unmount
		return () => {
			fsCheckout.close();
			fsCheckout.destroy();
		};
	}, [fsCheckout]);
	return fsCheckout;
}