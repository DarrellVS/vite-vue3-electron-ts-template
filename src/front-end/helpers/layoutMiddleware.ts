export async function loadLayoutMiddleware(route: any) {
  try {
    let layout = route.meta.layout;
    let layoutComponent = await import(`../components/layouts/${layout}.vue`);
    route.meta.layoutComponent = layoutComponent.default;
  } catch (e) {
    console.error('Error occurred in processing of layouts: ', e);
    console.log('Mounted default layout AppLayoutDefault');
  }
}
