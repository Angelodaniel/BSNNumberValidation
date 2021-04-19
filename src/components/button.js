(() => ({
  name: 'Button',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  styleType: 'BUTTON',
  jsx: (() => {
    const { CircularProgress, Tooltip } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const {
      disabled,
      size,
      icon,
      iconPosition,
      linkType,
      // linkTo,
      // linkToExternal,
      openLinkToExternal,
      visible,
      actionId,
      buttonText,
      actionModels,
      addTooltip,
      hasVisibleTooltip,
      tooltipContent,
      tooltipPlacement,
    } = options;
    const {
      env,
      getModel,
      getIdProperty,
      useText,
      useAction,
      useProperty,
      // useEndpoint,
    } = B;
    const isDev = env === 'dev';
    const isAction = linkType === 'action';
    // const hasLink = linkTo && linkTo.id !== '';
    // const hasExternalLink = linkToExternal && linkToExternal.id !== '';
    // const linkToExternalVariable =
    //   (linkToExternal && useText(linkToExternal)) || '';
    const buttonContent = useText(buttonText);
    const tooltipText = useText(tooltipContent);

    const [isVisible, setIsVisible] = useState(visible);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(hasVisibleTooltip);

    const camelToSnakeCase = str =>
      str[0].toLowerCase() +
      str
        .slice(1, str.length)
        .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

    const input =
      !isDev && actionModels
        ? actionModels.reduce((acc, value) => {
            const propertyUuid = getIdProperty(value);
            const model = getModel(value);
            const recordId = propertyUuid && useProperty(propertyUuid);

            if (recordId !== undefined) {
              acc[camelToSnakeCase(model.name)] = {
                variable_id: recordId,
              };
            }
            return acc;
          }, {})
        : {};

    const [actionCallback, { loading }] = (isAction &&
      useAction(actionId, {
        variables: {
          input,
        },
        onCompleted(data) {
          B.triggerEvent('onActionSuccess', data.actionb5);
        },
        onError(error) {
          B.triggerEvent('onActionError', error);
        },
      })) || [() => {}, { loading: false }];

    useEffect(() => {
      setIsVisible(visible);
      setIsOpen(hasVisibleTooltip);
    }, [visible, hasVisibleTooltip]);

    B.defineFunction('Show', () => setIsVisible(true));
    B.defineFunction('Hide', () => setIsVisible(false));
    B.defineFunction('Show/Hide', () => setIsVisible(s => !s));
    B.defineFunction('Toggle loading state', () => setIsLoading(s => !s));

    useEffect(() => {
      if (loading) {
        B.triggerEvent('onActionLoad', loading);
      }
    }, [loading]);

    const buttonProps = {
      disabled: disabled || isLoading || loading,
      tabindex: isDev && -1,
    };

    const aProps = {
      // @ TODO: remove nested ternary
      // href: disabled
      //   ? false
      //   : linkType === 'external' && hasExternalLink
      //   ? linkToExternalVariable
      //   : linkType === 'internal' && hasLink
      //   ? useEndpoint(linkTo)
      //   : false,
      target: openLinkToExternal,
    };

    const showIndicator = isLoading || loading;

    const emptySpace = () => {
      if (icon === 'None') {
        return '\xA0';
      }
      return null;
    };

    const BasicButtonComponent = (
      <a {...aProps} className={classes.a}>
        <button
          className={classes.root}
          type="button"
          {...buttonProps}
          onClick={event => {
            event.stopPropagation();
            actionCallback();
          }}
        >
          {icon !== 'None' && iconPosition === 'start' && (
            <span
              style={{
                marginRight: buttonContent ? '5px' : 0,
                display: 'flex',
              }}
            >
              {React.createElement(Icons[icon], { fontSize: size })}
            </span>
          )}
          {buttonContent !== '' ? buttonContent : emptySpace}

          {icon !== 'None' && iconPosition === 'end' && (
            <span
              style={{ marginLeft: buttonContent ? '5px' : 0, display: 'flex' }}
            >
              {React.createElement(Icons[icon], { fontSize: size })}
            </span>
          )}
          {showIndicator && (
            <CircularProgress size={16} className={classes.loader} />
          )}
        </button>
      </a>
    );

    let tooltipProps = {
      title: tooltipText,
      placement: tooltipPlacement,
      arrow: true,
      classes: {
        tooltip: classes.tooltip,
        arrow: classes.arrow,
      },
    };

    if (isDev) {
      tooltipProps = {
        ...tooltipProps,
        open: isOpen,
      };
    }

    const ButtonWithTooltip = (
      <Tooltip {...tooltipProps}>{BasicButtonComponent}</Tooltip>
    );

    const ButtonComponent = addTooltip
      ? ButtonWithTooltip
      : BasicButtonComponent;

    if (!isDev) {
      if (!isVisible) {
        return <></>;
      }
      return ButtonComponent;
    }

    return <div className={classes.wrapper}>{ButtonComponent}</div>;
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const newStyling = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : newStyling.getSpacing(idx, device);
    return {
      wrapper: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'flex' : 'inline-block',
        minHeight: '1rem',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      a: ({ options: { fullWidth, outerSpacing } }) => ({
        textDecoration: 'none',
        display: fullWidth ? 'inline-flex' : 'inline-block',
        width: !fullWidth
          ? 'auto'
          : `calc(100% - ${getSpacing(outerSpacing[1])} - ${getSpacing(
              outerSpacing[3],
            )})`,
        marginTop: getSpacing(outerSpacing[0]),
        marginRight: getSpacing(outerSpacing[1]),
        marginBottom: getSpacing(outerSpacing[2]),
        marginLeft: getSpacing(outerSpacing[3]),
        '&.MuiButton-root, &.MuiIconButton-root': {
          [`@media ${mediaMinWidth(600)}`]: {
            width: () => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Portrait');
              const marginLeft = getSpacing(outerSpacing[3], 'Portrait');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
            marginTop: getSpacing(outerSpacing[0], 'Portrait'),
            marginRight: getSpacing(outerSpacing[1], 'Portrait'),
            marginBottom: getSpacing(outerSpacing[2], 'Portrait'),
            marginLeft: getSpacing(outerSpacing[3], 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            width: () => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Landscape');
              const marginLeft = getSpacing(outerSpacing[3], 'Landscape');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
            marginTop: getSpacing(outerSpacing[0], 'Landscape'),
            marginRight: getSpacing(outerSpacing[1], 'Landscape'),
            marginBottom: getSpacing(outerSpacing[2], 'Landscape'),
            marginLeft: getSpacing(outerSpacing[3], 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            width: () => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Desktop');
              const marginLeft = getSpacing(outerSpacing[3], 'Desktop');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
            marginTop: getSpacing(outerSpacing[0], 'Desktop'),
            marginRight: getSpacing(outerSpacing[1], 'Desktop'),
            marginBottom: getSpacing(outerSpacing[2], 'Desktop'),
            marginLeft: getSpacing(outerSpacing[3], 'Desktop'),
          },
        },
      }),
      root: ({ style }) => ({
        ...style,
        display: 'flex',
        width: '100%',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '0.3s',

        '&:hover': {
          filter: 'brightness(90%)',
        },
        '&:active, &:focus': {
          filter: 'brightness(85%)',
          outline: 'none',
        },
      }),
      loader: {
        color: 'inherit!important',
        marginLeft: '0.25rem',
      },
      empty: {
        '&::before': {
          content: '"\xA0"',
        },
      },
      tooltip: {
        backgroundColor: ({ options: { tooltipBackground } }) => [
          newStyling.getColor(tooltipBackground),
          '!important',
        ],
        color: ({ options: { tooltipText } }) => [
          newStyling.getColor(tooltipText),
          '!important',
        ],
      },
      arrow: {
        color: ({ options: { tooltipBackground } }) => [
          newStyling.getColor(tooltipBackground),
          '!important',
        ],
      },
    };
  },
}))();
