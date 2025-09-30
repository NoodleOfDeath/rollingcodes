/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from 'react';
import type {
  DimensionValue,
  TextProps as RNTextProps,
  ViewProps as RNViewProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type { HapticFeedbackTypes, HapticOptions } from 'react-native-haptic-feedback';
import type { LinearGradientProps } from 'react-native-linear-gradient';

import { ColorScheme } from '../../types';

export type PrimativeProps = 'adaptive' | 'alignItems' | 'alignSelf' | 'appleBlue' | 'aspectRatio' | 'backfaceVisibility' | 'backgroundColor' | 'bold' | 'borderBottomColor' | 'borderBottomLeftRadius' | 'borderBottomRightRadius' | 'borderBottomWidth' | 'borderColor' | 'borderLeftColor' | 'borderLeftWidth' | 'borderRadius' | 'borderRightColor' | 'borderRightWidth' | 'borderTopColor' | 'borderTopLeftRadius' | 'borderTopRightRadius' | 'borderTopWidth' | 'borderWidth' | 'bottom' | 'capitalize' | 'colGap' | 'color' | 'destructive' | 'elevation' | 'flex' | 'flexBasis' | 'flexDirection' | 'flexGrow' | 'flexShrink' | 'font' | 'fontFamily' | 'fontSize' | 'fontStyle' | 'fontWeight' | 'gap' | 'height' | 'italic' | 'justifyContent' | 'left' | 'letterSpacing' | 'lineHeight' | 'lineThrough' | 'lowercase' | 'margin' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginTop' | 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth' | 'objectFit' | 'opacity' | 'overflow' | 'overlayColor' | 'padding' | 'paddingBottom' | 'paddingLeft' | 'paddingRight' | 'paddingTop' | 'position' | 'resizeMode' | 'right' | 'rowGap' | 'sentenceCase' | 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'textAlign' | 'textCenter' | 'textDecorationLine' | 'textLeft' | 'textRight' | 'textTransform' | 'tintColor' | 'top' | 'transform' | 'underline' | 'uppercase' | 'width' | 'zIndex';

export type ViewProps = Omit<RNViewProps & ViewStyle, PrimativeProps> & {

  disabled?: boolean;
  // preset variants
  outlined?: boolean;
  outlinedThick?: boolean;
  /** borderRadius 100 */
  rounded?: boolean;
  /** borderRadius 12 */
  beveled?: boolean;

  elevation?: number;
  
  haptic?: HapticFeedbackTypes | boolean;
  hapticOptions?: HapticOptions;
  
  inactive?: boolean;
  faded?: boolean;
  invert?: boolean;
  chip?: boolean;
  
  gradient?: Partial<LinearGradientProps>;

  // position
  
  absolute?: boolean;
  relative?: boolean;
  
  pos?: ViewStyle['position'];
  position?: ViewStyle['position'];
  
  top?: ViewStyle['top'];
  bottom?: ViewStyle['bottom'];
  left?: ViewStyle['left'];
  right?: ViewStyle['right'];
  
  z?: ViewStyle['zIndex'];
  zIndex?: ViewStyle['zIndex'];

  // dimensions
  
  aspect?: ViewStyle['aspectRatio'];
  aspectRatio?: ViewStyle['aspectRatio'];
  
  width?: ViewStyle['width'] | string;
  height?: ViewStyle['height'] | string;
  
  minWidth?: ViewStyle['minWidth'] | string;
  minHeight?: ViewStyle['minHeight'] | string;
  
  maxWidth?: ViewStyle['maxWidth'] | string;
  maxHeight?: ViewStyle['maxHeight'] | string;

  // margin
  
  m?: ViewStyle['margin'] | string;
  margin?: ViewStyle['margin'] | string;
  
  mx?: ViewStyle['marginHorizontal'] | string;
  marginX?: ViewStyle['marginHorizontal'] | string;
  my?: ViewStyle['marginVertical'] | string;
  marginY?: ViewStyle['marginVertical'] | string;
  
  ml?: ViewStyle['marginLeft'] | string;
  marginLeft?: ViewStyle['marginLeft'] | string;
  mr?: ViewStyle['marginRight'] | string;
  marginRight?: ViewStyle['marginRight'] | string;
  mt?: ViewStyle['marginTop'] | string;
  marginTop?: ViewStyle['marginTop'] | string;
  mb?: ViewStyle['marginBottom'] | string;
  marginBottom?: ViewStyle['marginBottom'] | string;

  // padding
  
  p?: ViewStyle['padding'] | string;
  padding?: ViewStyle['padding'] | string;
  
  px?: ViewStyle['paddingHorizontal'] | string;
  paddingX?: ViewStyle['paddingHorizontal'] | string;
  py?: ViewStyle['paddingVertical'] | string;
  paddingY?: ViewStyle['paddingVertical'] | string;
  
  pl?: ViewStyle['paddingLeft'] | string;
  paddingLeft?: ViewStyle['paddingLeft'] | string;
  pr?: ViewStyle['paddingRight'] | string;
  paddingRight?: ViewStyle['paddingRight'] | string;
  pt?: ViewStyle['paddingTop'] | string;
  paddingTop?: ViewStyle['paddingTop'] | string;
  pb?: ViewStyle['paddingBottom'] | string;
  paddingBottom?: ViewStyle['paddingBottom'] | string;

  // appearance
  
  bg?: ViewStyle['backgroundColor'];
  bgColor?: ViewStyle['backgroundColor'];
  backgroundColor?: ViewStyle['backgroundColor'];
  opacity?: ViewStyle['opacity'];
  overflow?: ViewStyle['overflow'];

  // border color
  
  bColor?: ViewStyle['borderColor'];
  borderColor?: ViewStyle['borderColor'];
  
  bcTop?: ViewStyle['borderTopColor'];
  borderTopColor?: ViewStyle['borderTopColor'];
  bcRight?: ViewStyle['borderRightColor'];
  borderRightColor?: ViewStyle['borderRightColor'];
  bcBottom?: ViewStyle['borderBottomColor'];
  borderBottomColor?: ViewStyle['borderBottomColor'];
  bcLeft?: ViewStyle['borderLeftColor'];
  borderLeftColor?: ViewStyle['borderLeftColor'];

  // border radius
  
  bRadius?: ViewStyle['borderRadius'];
  borderRadius?: ViewStyle['borderRadius'];
  
  brTopLeft?: ViewStyle['borderTopLeftRadius'];
  borderTopLeftRadius?: ViewStyle['borderTopLeftRadius'];
  brTopRight?: ViewStyle['borderTopRightRadius'];
  borderTopRightRadius?: ViewStyle['borderTopRightRadius'];
  brBottomLeft?: ViewStyle['borderBottomLeftRadius'];
  borderBottomLeftRadius?: ViewStyle['borderBottomLeftRadius'];
  brBottomRight?: ViewStyle['borderBottomRightRadius'];
  borderBottomRightRadius?: ViewStyle['borderBottomRightRadius'];

  // border width
  
  bWidth?: ViewStyle['borderWidth'];
  borderWidth?: ViewStyle['borderWidth'];
  
  bwTop?: ViewStyle['borderTopWidth'];
  borderTopWidth?: ViewStyle['borderTopWidth'];
  bwRight?: ViewStyle['borderRightWidth'];
  borderRightWidth?: ViewStyle['borderRightWidth'];
  bwBottom?: ViewStyle['borderBottomWidth'];
  borderBottomWidth?: ViewStyle['borderBottomWidth'];
  bwLeft?: ViewStyle['borderLeftWidth'];
  borderLeftWidth?: ViewStyle['borderLeftWidth'];

  // flex
  
  col?: boolean;
  colRev?: boolean;
  colReverse?: boolean;

  row?: boolean;
  rowRev?: boolean;
  rowReverse?: boolean;

  flexDir?: ViewStyle['flexDirection'];
  flexDirection?: ViewStyle['flexDirection'];

  flex?: ViewStyle['flex'];
  flexWrap?: ViewStyle['flexWrap'];
  flexGrow?: ViewStyle['flexGrow'];
  flexShrink?: ViewStyle['flexShrink'];
  flexBasis?: ViewStyle['flexBasis'];

  itemsCenter?: boolean;
  itemsEnd?: boolean;
  itemsStart?: boolean;
  itemsStretch?: boolean;
  alignItems?: ViewStyle['alignItems'];

  alignCenter?: boolean;
  alignEnd?: boolean;
  alignStart?: boolean;
  alignStretch?: boolean;
  alignSelf?: ViewStyle['alignSelf'];

  justifyAround?: boolean;
  justifySpaceAround?: boolean;
  justifyCenter?: boolean;
  justifyEnd?: boolean;
  justifyEvenly?: boolean;
  justifySpaceEvenly?: boolean;
  justifyStart?: boolean;
  justifyBetween?: boolean;
  justifySpaceBetween?: boolean;
  justify?: ViewStyle['justifyContent'];
  justifyContent?: ViewStyle['justifyContent'];

  gap?: number | string;
  rowGap?: number | string;
  colGap?: number | string;
  columnGap?: number | string;

  shadowColor?: ViewStyle['shadowColor'];
  shadowOffset?: ViewStyle['shadowOffset'];
  shadowOpacity?: ViewStyle['shadowOpacity'];
  shadowRadius?: ViewStyle['shadowRadius'];
  
  color?: CSSProperties['color'] | TextStyle['color'];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;

};

export const FONT_SIZES = {
  body1: 18,
  body2: 16,
  caption: 14,
  footnote: 10,
  h1: 34,
  h2: 32,
  h3: 30,
  h4: 28,
  h5: 26,
  h6: 24,
  minute: 8,
  subtitle1: 22,
  subtitle2: 20,
} as const;

export type TextProps = Omit<RNTextProps & TextStyle, PrimativeProps> & {

  /** alias for {@link TextProps.fontFamily} */
  font?: string;
  fontFamily?: string;
  fontSize?: TextStyle['fontSize'] | string;
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textTransform?: TextStyle['textTransform'];

  /** alias for {@link TextProps.adjustFontSizeToFit} */
  adaptive?: RNTextProps['adjustsFontSizeToFit'];
  adjustsFontSizeToFit?: RNTextProps['adjustsFontSizeToFit'];
  /** set `true` to make font not scale to preference */
  fontSizeFixed?: boolean;

  // spacing and height
  letterSpacing?: TextStyle['letterSpacing'];
  lineHeight?: TextStyle['lineHeight'];

  // alignment
  /** alias for {@link textAlign} = `"center"` **/
  textCenter?: boolean;
  /** alias for {@link textAlign} = `"left"` **/
  textLeft?: boolean;
  /** alias for {@link textAlign} = `"right"` **/
  textRight?: boolean;
  textAlign?: TextStyle['textAlign'];

  // style and color
  /** alias for {@link fontWeight} = `"bold"` **/
  bold?: boolean;
  /** alias for {@link fontStyle} = `"italic"` **/
  italic?: boolean;
  /** alias for {@link textDecorationLine} = `"underline"` **/
  underline?: boolean;
  /** alias for {@link textDecorationLine} = `"line-through"` **/
  lineThrough?: boolean;

  color?: CSSProperties['color'] | TextStyle['color'];

  // text transformation
  sentenceCase?: boolean;
  capitalize?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;

  // presets
  appleBlue?: boolean;
  destructive?: boolean;

} & { [key in keyof typeof FONT_SIZES]?: boolean };

export type TextViewProps = TextProps & ViewProps;

export const TEXT_PROP_NAMES: (keyof TextProps)[] = [
  'adaptive',
  'adjustsFontSizeToFit',
  'appleBlue',
  'bold',
  'capitalize',
  'color',
  'destructive',
  'font',
  'fontFamily',
  'fontSize',
  'fontSizeFixed',
  'fontStyle',
  'fontWeight',
  'italic',
  'letterSpacing',
  'lineHeight',
  'lineThrough',
  'lowercase',
  'sentenceCase',
  'textAlign',
  'textCenter',
  'textDecorationLine',
  'textLeft',
  'textRight',
  'textTransform',
  'uppercase',
  'underline',
];

export type StyleTransformOptions = {
  includeProps?: string[];
  excludeProps?: string[];
};

export type StyleTransform<
  Props extends ViewProps,
  ReturnType,
> = (props: Props, options?: StyleTransformOptions) => ReturnType | undefined;

/**
 * This is specifically used for react native Text components only
 */
export const useTextPropsToStyles= <
  Props extends TextViewProps = TextViewProps,
>(props: Props, options?: StyleTransformOptions) => {
    
  const style = React.useMemo(() => {
    const style: TextViewProps = { ...(props.style == null ? {} : (props.style as TextViewProps)) };

    // font
    style.color = props.color ?? (props.appleBlue ? '#007AFF' : undefined) ?? (props.destructive ? 'red' : undefined);
    style.fontSize = props.fontSize ?? (props.body1 ? FONT_SIZES.body1 : props.body2 ? FONT_SIZES.body2 : props.caption ? FONT_SIZES.caption : props.footnote ? FONT_SIZES.footnote : props.caption ? FONT_SIZES.caption : props.h1 ? FONT_SIZES.h1 : props.h2 ? FONT_SIZES.h2 : props.h3 ? FONT_SIZES.h3 : props.h4 ? FONT_SIZES.h4 : props.h5 ? FONT_SIZES.h5 : props.h6 ? FONT_SIZES.h6 : props.subtitle1 ? FONT_SIZES.subtitle1 : props.subtitle2 ? FONT_SIZES.subtitle2 : props.minute ? FONT_SIZES.minute : undefined);
    style.fontFamily = props.fontFamily ?? 'SF Pro';
    style.fontWeight = props.bold ? 'bold' : props.fontWeight;
    style.fontStyle = props.italic ? 'italic' : props.fontStyle;
    style.textAlign = props.textCenter ? 'center' : props.textRight ? 'right' : props.textLeft ? 'left' : props.textAlign;
    style.textDecorationLine = props.underline ? 'underline' : props.lineThrough ? 'line-through' : props.textDecorationLine;
    style.textTransform = props.uppercase ? 'uppercase' : props.lowercase ? 'lowercase' : props.capitalize ? 'capitalize' : props.textTransform;
    style.lineHeight = props.lineHeight ?? (typeof style.fontSize === 'number' ? style.fontSize * 1.5 : undefined);
    style.letterSpacing = props.letterSpacing;

    Object.keys(style).forEach((k) => {
      if (options?.excludeProps?.includes(k)) {
        delete style[k as keyof TextViewProps];
      }
      if (options?.includeProps && !options.includeProps.includes(k)) {
        delete style[k as keyof TextViewProps];
      }
    });

    return style;
  }, [props, options]);
    
  return { ...style, ...(props.style == null ? {} : props.style as TextStyle) } as TextStyle & ViewStyle;
    
}; 

export const IMAGE_PROP_NAMES = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'aspectRatio',
  'borderBottomWidth',
  'borderEndWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderStartWidth',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'columnGap',
  'direction',
  'display',
  'end',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'gap',
  'height',
  'inset',
  'insetBlock',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInline',
  'insetInlineEnd',
  'insetInlineStart',
  'justifyContent',
  'left',
  'margin',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'padding',
  'paddingBlock',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingInline',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingVertical',
  'position',
  'right',
  'rowGap',
  'start',
  'top',
  'width',
  'zIndex',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'transform',
  'backfaceVisibility',
  'backgroundColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderColor',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'objectFit',
  'opacity',
  'overlayColor',
  'tintColor',
  'resizeMode',
] as const;

export const usePropsToStyle = <
  Props extends TextViewProps = TextViewProps,
>(props: Props, options?: StyleTransformOptions) => {

  const textStyles = useTextPropsToStyles(props, options);
  
  const style = React.useMemo(() => {
    if (!textStyles) {
      return {};
    }
    
    const style = textStyles;

    // position
    style.position = (props.position ?? props.pos) ?? props.absolute ? 'absolute' : props.relative ? 'relative' : undefined;
    style.top = props.top;
    style.left = props.left;
    style.right = props.right;
    style.bottom = props.bottom;
    
    style.zIndex = props.zIndex ?? props.z;

    // dimensions
    style.aspectRatio = props.aspectRatio ?? props.aspect;
    style.width = props.width as DimensionValue;
    style.minWidth = props.minWidth as DimensionValue;
    style.maxWidth = props.maxWidth as DimensionValue;
    style.height = props.height as DimensionValue;
    style.minHeight = props.minHeight as DimensionValue;
    style.maxHeight = props.maxHeight as DimensionValue;

    // padding
    style.paddingTop = props.paddingTop ?? props.pt ?? props.paddingY ?? props.py ?? props.padding ?? props.p ?? (props.chip ? 6 : props.padding ?? props.p) as any;
    style.paddingRight = props.paddingRight ?? props.pr ?? props.paddingX ?? props.px ?? props.padding ?? props.p ?? (props.chip ? 24 : props.padding ?? props.p) as any;
    style.paddingBottom = props.paddingBottom ?? props.pb ?? props.paddingY ?? props.py ?? props.padding ?? props.p ?? (props.chip ? 6 : props.padding ?? props.p) as any;
    style.paddingLeft = props.paddingLeft ?? props.pl ?? props.paddingX ?? props.px ?? props.padding ?? props.p ?? (props.chip ? 24 : props.padding ?? props.p) as any;

    // margin
    style.marginTop = props.marginTop ?? props.mt ?? props.marginY ?? props.my ?? props.margin ?? props.m as any;
    style.marginRight = props.marginRight ?? props.mr ?? props.marginX ?? props.mx ?? props.margin ?? props.m as any;
    style.marginBottom = props.marginBottom ?? props.mb ?? props.marginY ?? props.my ?? props.margin ?? props.m as any;
    style.marginLeft = props.marginLeft ?? props.ml ?? props.marginX ?? props.mx ?? props.margin ?? props.m as any;

    // flex
    style.display = props.display ?? (props.row ?? props.rowReverse ?? props.rowRev ?? props.col ?? props.colReverse ?? props.colRev ?? props.flexDirection ?? props.flexDir ?? props.gap) ? 'flex' : undefined;
    style.flexDirection = props.flexDirection ?? props.flexDir ?? (props.row ? 'row' : (props.rowReverse ?? props.rowRev) ? 'row-reverse' : (props.col ? 'column' : (props.colReverse ?? props.colRev) ? 'column-reverse' : style.display === 'flex' ? 'column' : undefined));
    style.flex = props.flex;
    style.flexGrow = props.flexGrow;

    // align
    style.alignContent = props.alignContent ?? props.alignCenter ? 'center' : props.alignEnd ? 'flex-end' : props.alignStart ? 'flex-start' : undefined;
    style.alignItems = props.alignItems ?? props.itemsCenter ? 'center' : props.itemsEnd ? 'flex-end' : props.itemsStart ? 'flex-start' : undefined;

    // justify
    style.justifyContent = props.justifyContent ?? (props.justifyCenter ? 'center' : props.justifyEnd ? 'flex-end' : props.justifyStart ? 'flex-start' : props.justifySpaceBetween ? 'space-between' : props.justifySpaceEvenly ? 'space-evenly' : props.justifySpaceAround ? 'space-around' : undefined);

    // spacing
    style.gap = props.gap as any;
    
    // background
    style.backgroundColor = props.backgroundColor ?? props.bgColor ?? props.bg;

    // border radius
    style.borderTopLeftRadius = (props.borderTopLeftRadius ?? props.brTopLeft ?? props.borderRadius) ?? ((props.rounded || props.chip) ? 600 : (props.beveled ? 6 : undefined));
    style.borderTopRightRadius = (props.borderTopRightRadius ?? props.brTopRight ?? props.borderRadius) ?? ((props.rounded || props.chip) ? 600 : (props.beveled ? 6 : undefined));
    style.borderBottomLeftRadius = (props.borderBottomLeftRadius ?? props.brBottomLeft ?? props.borderRadius) ?? ((props.rounded || props.chip) ? 600 : (props.beveled ? 6 : undefined));
    style.borderBottomRightRadius = (props.brBottomRight ?? props.borderBottomRightRadius ?? props.borderRadius) ?? ((props.rounded || props.chip) ? 600 : (props.beveled ? 6 : undefined));

    // border width
    style.borderTopWidth = props.borderTopWidth ?? props.bwTop ?? props.borderWidth ?? props.outlinedThick ? 3 : props.outlined ? 1 : undefined;
    style.borderRightWidth = props.borderRightWidth ?? props.bwRight ?? props.borderWidth ?? props.outlinedThick ? 3 : props.outlined ? 1 : undefined;
    style.borderBottomWidth = props.borderBottomWidth ?? props.bwBottom ?? props.borderWidth ?? props.outlinedThick ? 3 : props.outlined ? 1 : undefined;
    style.borderLeftWidth = props.borderLeftWidth ?? props.bwLeft ?? props.borderWidth ?? props.outlinedThick ? 3 : props.outlined ? 1 : undefined;

    style.overflow = props.overflow ?? (props.chip ?? props.rounded) ? 'hidden' : undefined;

    // elevation
    style.elevation = props.elevation;
    style.shadowColor = props.shadowColor ?? 'black';
    style.shadowOffset = props.shadowOffset ?? { height: 2, width: 0 };
    style.shadowOpacity = props.shadowOpacity ?? (props.elevation ?? 0) / 5;

    // opacity
    style.opacity = props.opacity ?? (((props.inactive && !props.children) ?? props.faded) ? 0.5 : undefined);

    // border color
    style.borderTopColor = props.borderTopColor ?? props.bcTop ?? props.borderColor;
    style.borderRightColor = props.borderRightColor ?? props.bcRight ?? props.borderColor;
    style.borderBottomColor = props.borderBottomColor ?? props.bcBottom ?? props.borderColor;
    style.borderLeftColor = props.borderLeftColor ?? props.bcLeft ?? props.borderColor;

    Object.keys(style).forEach((k) => {
      if (options?.excludeProps?.includes(k as any)) {
        delete style[k as keyof (TextStyle & ViewStyle)];
      }
      if (options?.includeProps && !options.includeProps.includes(k as any)) {
        delete style[k as keyof (TextStyle & ViewStyle)];
      }
    });

    return style;
  }, [textStyles, props, options]);
  
  return { ...style, ...(props.style == null ? {} : props.style as ViewStyle) } as CSSProperties & TextStyle & ViewStyle;
  
};

export type Theme<
  Props extends TextViewProps = TextViewProps
> = {
  light: Props;
  dark: Props;
};

export const useThemedProps = <
  Props extends TextViewProps = TextViewProps,
  T extends Theme<Partial<Props>> = Theme<Partial<Props>>,
>(theme: T, props: Props, transformOptions?: StyleTransformOptions, colorScheme?: ColorScheme) => {
  const obj = React.useMemo(() => colorScheme === 'dark' ? theme.dark : theme.light, [colorScheme, theme]);
  return Object.fromEntries(Object.entries(obj)
    .filter(([k]) => !transformOptions?.excludeProps || !transformOptions?.excludeProps.includes(k))) as Props;
};

export type BaseComponentProps<
  Props extends TextViewProps = TextViewProps
> = Props & {
  gradientGenerator?: (props: LinearGradientProps & Props) => React.ReactNode;
  overlayGenerator?: (props: Props) => React.ReactNode;
  transformOptions?: StyleTransformOptions;
  passDownTo?: (keyof Props)[];
  Component: React.ComponentType<Props>;
};

export const BaseComponent = React.forwardRef(function BaseComponen<
  Props extends TextViewProps = TextViewProps,
  RefType = Props
>({ 
  Component,
  gradientGenerator,
  overlayGenerator,
  passDownTo,
  transformOptions,
  ...props
}: BaseComponentProps<Props>, ref: RefType) {
  const style = usePropsToStyle(props, transformOptions);
  const gradient = props.gradient ? gradientGenerator?.({
    ...(props as unknown as Props), colors: [], ...props.gradient, 
  }) : undefined;
  const overlay = props.inactive ? overlayGenerator?.(props as unknown as Props) : undefined;
  if (props.children) {
    return (
      <Component
        ref={ ref }
        { ...(props as unknown as Props) }
        { ...(passDownTo ? Object.fromEntries(passDownTo.map((k) => [k, style])) : {}) }
        style={ style }>
        <React.Fragment>
          {gradient}
          {props.children}
          {overlay}
        </React.Fragment>
      </Component>
    );
  }
  return (
    <Component
      ref={ ref }
      { ...(props as unknown as Props) } 
      { ...(passDownTo ? Object.fromEntries(passDownTo.map((k) => [k, style])) : {}) }
      style={ style } />
  );
}) as (<
  Props extends TextViewProps = TextViewProps, 
  RefType = Props
>(
  props: BaseComponentProps<Props> & { ref?: React.Ref<RefType> }
) => React.ReactElement);

export type ThemedComponentProps<
  Props extends TextViewProps = TextViewProps,
  T extends Theme<Partial<Props>> = Theme<Partial<Props>>,
> = BaseComponentProps<Props> & Props & {
  theme: T;
  colorScheme?: ColorScheme;  
};

export const ThemedComponent = React.forwardRef(function ThemedComponent<
  Props extends TextViewProps = TextViewProps,
  RefType = Props,
  T extends Theme<Partial<Props>> = Theme<Partial<Props>>,
>({
  theme, 
  Component, 
  colorScheme,
  transformOptions,
  passDownTo,
  ...props
}: ThemedComponentProps<Props, T>, ref: RefType) {
  const themedProps = useThemedProps<Props>(theme, props as unknown as Props, transformOptions, colorScheme);
  const style = usePropsToStyle(themedProps, transformOptions);
  return (
    <Component
      ref={ ref }
      { ...themedProps }
      { ...(passDownTo ? Object.fromEntries(passDownTo.map((k) => [k, style])) : {}) }
      { ...(props as unknown as Props) } />
  );
}) as (<
  Props extends TextViewProps = TextViewProps, 
  RefType = Props,
  T extends Theme<Partial<Props>> = Theme<Partial<Props>>
>(
  props: ThemedComponentProps<Props, T> & { ref?: React.Ref<RefType> }
) => React.ReactElement);