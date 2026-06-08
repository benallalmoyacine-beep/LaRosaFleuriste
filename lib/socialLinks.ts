export const SOCIAL = {
  instagram: {
    app: "instagram://user?username=la_rosa_fleuriste_tlemcen",
    web: "https://www.instagram.com/la_rosa_fleuriste_tlemcen/",
  },
  facebook: {
    app: "fb://page/100091832552880",
    web: "https://www.facebook.com/profile.php?id=100091832552880",
  },
  tiktok: {
    app: "tiktok://user/@lavieestbelle6581",
    web: "https://www.tiktok.com/@lavieestbelle6581",
  },
  whatsapp: {
    app: "https://wa.me/213791112663",
    web: "https://wa.me/213791112663",
  },
};

/**
 * Sur mobile : tente d'ouvrir l'app native.
 * Si l'app n'est pas installée (pas de blur dans les 600ms), redirige vers le web.
 * Sur desktop : ouvre directement le site web dans un nouvel onglet.
 */
export function openSocial(appUrl: string, webUrl: string) {
  const isMobile =
    typeof navigator !== "undefined" &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (!isMobile) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }

  let appOpened = false;

  const onBlur = () => {
    appOpened = true;
  };
  window.addEventListener("blur", onBlur, { once: true });

  const timer = setTimeout(() => {
    window.removeEventListener("blur", onBlur);
    if (!appOpened) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
    }
  }, 600);

  // Nettoyage si l'app s'est bien ouverte
  window.addEventListener(
    "blur",
    () => clearTimeout(timer),
    { once: true }
  );

  window.location.href = appUrl;
}
