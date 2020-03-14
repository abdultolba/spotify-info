import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<AppContext.Provider
			value={{
				isLoading,
				setIsLoading,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
