const presence = new Presence({
    clientId: "864304063804997702",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
const { pathname, href } = window.location,
    presenceData: PresenceData = {
        startTimestamp: browsingTimestamp,
        largeImageKey: "https://i.imgur.com/OONOWga.png",
    };

if (/^\/(page\/\d+\/?)?$/.test(pathname))
    presenceData.details = "Navegando pela página inicial.";
else if (/^\/inicio\/manga\/?$/.test(pathname))
    presenceData.details = "Olhando a lista de projetos";
else if (/^\/inicio\/manga\/[0-9a-z-]+\/?$/i.test(pathname)) {
    presenceData.details = "Olhando a página do projeto";
    presenceData.state =
        document.querySelector<HTMLHeadingElement>(".entry-title").textContent;
    presenceData.buttons = [
        {
            label: "Visite a página inicial",
            url: href,
        },
    ];
} else if (/\/[a-z-19]+(cap|ch)-[0-9]+\/?$/i.test(pathname)) {
    const progress =
        (document.documentElement.scrollTop /
            (document.querySelector<HTMLDivElement>("#readerarea").scrollHeight -
                window.innerHeight)) *
        100;
    presenceData.details = "Lendo um manhwa";
    presenceData.state = `${
        document.querySelector<HTMLHeadingElement>(".entry-title").textContent
    } - ${(progress > 100 ? 100 : progress).toFixed(1)}%`;
    presenceData.buttons = [
        {
            label: "Visite a página do projeto",
            url: document.querySelector<HTMLAnchorElement>(".allc > a").href,
        },
        {
            label: "Leia o capítulo",
            url: href,
        },
    ];
} else if (pathname.startsWith("inicio/user-settings/?tab=bookmark"))
    presenceData.details = "Olhando os favoritos";
else {
    presenceData.details = "Navegando pela Cerise";
    presenceData.state = document.title;
}

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});

const usertext = document.querySelector<HTMLElement>("body > div.wrap > div > header > div.c-sub-header-nav.with-border.hide-sticky-menu > div > div > div.c-modal_item > div > span"
);

if (usertext === null) {
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = usertext.textContent.slice(
        usertext.textContent.search(",") + 1
    );
}
presence.setActivity(presenceData);
