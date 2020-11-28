import VueIcon from './IconBase';
import { IconBaseProps } from './Icon';
import { IconDefinition } from '@ant-design/icons-svg/lib/types';
import { getTwoToneColor, TwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
import { normalizeTwoToneColors } from '../utils';
import { FunctionalComponent, PropType } from 'vue';

export interface AntdIconProps extends IconBaseProps {
  twoToneColor?: TwoToneColor;
}

export interface IconComponentProps extends AntdIconProps {
  icon: IconDefinition;
}
interface Color {
  getTwoToneColor: () => TwoToneColor;
  setTwoToneColor: (twoToneColor: TwoToneColor) => void;
}
export interface AntdIconType extends Color, FunctionalComponent<IconComponentProps> {
  displayName: string;
}

// Initial setting
setTwoToneColor('#1890ff');

const Icon: AntdIconType = (props, context) => {
  const {
    class: cls,
    icon,
    spin,
    rotate,
    tabindex,
    // other
    twoToneColor,
    onClick,
    ...restProps
  } = { ...props, ...context.attrs } as any;
  const classObj = {
    anticon: true,
    [`anticon-${icon.name}`]: Boolean(icon.name),
    [cls]: cls,
  };

  const svgClassString = spin === '' || !!spin || icon.name === 'loading' ? 'anticon-spin' : '';

  let iconTabIndex = tabindex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
    restProps.tabindex = iconTabIndex;
  }

  const svgStyle = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`,
      }
    : undefined;
  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);

  return (
    <span role="img" aria-label={icon.name} {...restProps} onClick={onClick} class={classObj}>
      <VueIcon
        class={svgClassString}
        icon={icon}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        style={svgStyle}
      />
    </span>
  );
};

Icon.props = {
  icon: Object as PropType<IconDefinition>,
  twoToneColor: String as PropType<TwoToneColor>,
};
Icon.displayName = 'AntdIcon';
Icon.inheritAttrs = false;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;
