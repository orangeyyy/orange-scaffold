export function littleCamel(name) {
  return name.replace(/^[\d|\W]*|\W/g, '').replace(/^[a-zA-Z]/, a => a.toLowerCase());
}

export function bigCamel(name) {
  return name.replace(/^[\d|\W]*|\W/g, '').replace(/^[a-zA-Z]/, a => a.toUpperCase());
}

export function pascal(name) {
  return littleCamel(name).replace(/[0-9A-Z]/g, a => `-${a.toLowerCase()}`);
}

