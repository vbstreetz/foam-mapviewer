import Box from '3box';
import { APP_SLUG } from 'config';

let setupPromise;
let space;

export async function setUp(addr, reset = false) {
  if (reset) {
    if (setupPromise) {
      await setupPromise;
      setupPromise = null;
    }
    space = null;
  }
  // console.log(addr);
  if (space) return;
  if (setupPromise) {
   const s = await setupPromise;
    setupPromise = null;
    return s;
  }
  setupPromise = setupSpace(addr);
}

async function setupSpace(addr) {
  // const provider = await Box.get3idConnectProvider();
  // const box = await Box.openBox(addr, provider);
  // space = await box.openSpace(APP_SLUG);

  const box = await Box.create(window.ethereum);
  await box.auth([ APP_SLUG], { address: addr });
  space = await box.openSpace(APP_SLUG);
}

export async function threeBox(k, v) {
  if (!space) {
    return console.warn('3box has not been setup.');
  }

  switch (arguments.length) {
    case 2:
      if (v === null) return await space.public.remove(k);
      return await space.public.set(k, JSON.stringify(v));

    case 1:
      try {
        return JSON.parse(await space.public.get(k));
      } catch (e) {
        return null;
      }

    default:
      return;
  }
}

export async function loadBookmarks() {
  if (setupPromise) await setupPromise;
  return (await threeBox('bookmarks')) || [];
}

export async function saveBookmarks(ids) {
  if (setupPromise) await setupPromise;
  return await threeBox('bookmarks', ids);
}
