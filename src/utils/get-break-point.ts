const getBreakpoint = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  if (window?.matchMedia('(max-width: 639px)').matches) {
    return 'xs';
  } else if (window?.matchMedia('(max-width: 767px)').matches) {
    return 'sm';
  } else if (window?.matchMedia('(max-width: 1023px)').matches) {
    return 'md';
  } else if (window?.matchMedia('(max-width: 1279px)').matches) {
    return 'lg';
  } else if (window?.matchMedia('(max-width: 1535px)').matches) {
    return 'xl';
  } else {
    return '2xl';
  }
};

export default getBreakpoint;
