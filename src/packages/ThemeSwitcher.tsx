import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { ThemeName, useThemeStore } from 'stores/themeStore';
import { useEffect } from 'react';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useThemeStore();

    useEffect(() => {
        setTheme(theme)
    }, [])

    return (
        <div className='flex items-center'>
            <label className="swap swap-rotate">
                <input 
                    type="checkbox" 
                    checked={theme == ThemeName.Dark} onChange={() => setTheme(theme == ThemeName.Dark ? ThemeName.Light : ThemeName.Dark)} 
                />
                <MoonIcon className='h-5 w-5 swap-on' />
                <SunIcon className='h-5 w-5 swap-off' />
            </label>
        </div>
    );
}

export default ThemeSwitcher;
