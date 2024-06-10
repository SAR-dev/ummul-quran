import { SwatchIcon } from '@heroicons/react/24/solid';
import { ThemeName, useThemeStore } from 'stores/themeStore';
import DropdownSelect from './DropdownSelect';

interface ThemeIcons {
    [key: string]: string;
}

const themeIcons: ThemeIcons = {
    light: "☀️",
    dark: "🌙",
    corporate: "👔",
    retro: "📹",
    cupcake: "🧁",
    luxury: "⚜️"
}

const ThemeSwitcher = () => {
    const { theme, setTheme } = useThemeStore();

    const getThemeIcon = (key: string) => {
        const value = themeIcons[key]
        return value !== undefined ? value : "❓";
    }

    return (
        <div>
            <DropdownSelect
                button={
                    <button className='btn btn-square btn-ghost'>
                        <SwatchIcon className='h-5 w-5' />
                    </button>
                }
                options={Object.keys(ThemeName).map(key => {
                    return {
                        text: key,
                        value: ThemeName[key as keyof typeof ThemeName],
                        handleClick: () => setTheme(ThemeName[key as keyof typeof ThemeName]),
                        icon: <div className='mr-2'>{getThemeIcon(ThemeName[key as keyof typeof ThemeName])}</div>
                    }
                })}
                selectedValue={theme}
            />
        </div>
    );
}

export default ThemeSwitcher;
