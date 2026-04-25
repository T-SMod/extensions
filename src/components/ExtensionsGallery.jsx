import React, {useState, useMemo} from "react";
import extensions from "../lib/ext";
import "../styles/extensions.css";

const creditLinkShortcuts = {
    "_scratch_": (credit) => `https://scratch.mit.edu/users/${credit.name}`,
    "_github_": (credit) => `https://github.com/${credit.name}`,
    "_dash_": (credit) => `https://dashblocks.github.io/user#${credit.name}`,
    "_dashDev_": (credit) => `https://dashblocks.github.io/scratch-gui/user#${credit.name}`,
    "_tsmod_": (credit) => `https://t-smod.github.io/scratch-gui/user#${credit.name}`
};
const creditLink = (credit) => credit.link;

function getBannerUrl (banner) {
    if (!banner) return `https://dashblocks.github.io/extensions/static/images/unknown.svg`;
    if (banner.startsWith("http://") || banner.startsWith("https://")) return banner;
    return `https://t-smod.github.io/extensions/static/images/${banner}`;
}

function getCodeUrl (code) {
    if (!code) return "#";
    if (code.startsWith("http://") || code.startsWith("https://")) return code;
    return `https://t-smod.github.io/extensions/static/extensions/${code}`;
}

function getCreatorNode (creator) {
    if (typeof creator == "string") return creator;
    return (
        <a
            href={(creditLinkShortcuts[creator.link] || creditLink)(creator)}
            target="_blank"
            rel="noreferrer"
            key={creator.name}
        >
            {creator.name}
        </a>
    );
}

function getCreatorName (creator) {
    if (typeof creator == "string") return creator;
    return creator.name;
}

export default function ExtensionsGallery () {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("og");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let result = extensions;
        if (sort === "abc") result = result.toSorted(
            (e1, e2) => (e1.name || "") === (e2.name || "") ? 0 : (e1.name || "") > (e2.name || "") ? 1 : -1
        );
        if (sort === "zyx") result = result.toSorted(
            (e1, e2) => (e1.name || "") === (e2.name || "") ? 0 : (e1.name || "") > (e2.name || "") ? -1 : 1
        );
        result = result.filter((e) => {
            if (!q) return true;
            return (
                (e.name || "").toLowerCase().includes(q) ||
                (e.description || "").toLowerCase().includes(q) ||
                (e.notes || "").toLowerCase().includes(q) ||
                (Array.isArray(e.creator)
                    ? e.creator.some((creator) => getCreatorName(creator || "").toLowerCase().includes(q))
                    : getCreatorName(e.creator || "").toString().toLowerCase().includes(q))
            );
        });
        return result;
    }, [extensions, query, sort]);

    return (
        <>
            <header className="ext-gallery-header">
                <h1>TSMod Extensions Gallery</h1>
                <div className="ext-controls">
                    <input
                        className="ext-search"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <select
                        class="ext-sort"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="og">Sort: Default</option>
                        <option value="abc">Sort: ABC</option>
                        <option value="zyx">Sort: ZYX</option>
                    </select>
                </div>
            </header>

            <div className="ext-gallery-root">
                <main>
                    <div className="ext-infobox">
                        <div className="ext-infobox-title">Some extensions will work only in TSMod.</div>
                        Extensions will likely not work in other mods than Dash or TSMod if they:
                        <ul>
                            <li>Rely on Arrays or Objects,</li>
                            <li>Use generator functions (function*) as serializers/deserializers of custom types,</li>
                            <li>Use Patcher, SandboxRunner APIs.</li>
                        </ul>
                    </div>
                    <div className="ext-grid">
                        {filtered.map((ext) => (
                            <div key={ext.id} className="ext-card">
                                <div className="ext-banner">
                                    <img
                                        src={getBannerUrl(ext.banner)}
                                    />
                                </div>
                                <div className="ext-body">
                                    <h2 className="ext-title">{ext.name}</h2>
                                    <p className="ext-description">{ext.description}</p>
                                    {ext.internetConnectionRequired && <p className="ext-meta">
                                        <b>Requires: </b>
                                        <img
                                            src="https://raw.githubusercontent.com/DashBlocks/extensions/refs/heads/develop/src/components/internet-connection.svg"
                                            className="ext-internet-connection-icon"
                                        />
                                    </p>}
                                    <p className="ext-meta">
                                        {Array.isArray(ext.creator)
                                            ? (
                                                <>
                                                    <b>Creators: </b>
                                                    {ext.creator.map((creator, i) => (
                                                        <React.Fragment key={i}>
                                                            {getCreatorNode(creator)}
                                                            {i !== ext.creator.length - 1 && (
                                                                ', '
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    <b>Creator: </b>
                                                    {getCreatorNode(ext.creator)}
                                                </>
                                            )
                                        }
                                    </p>
                                    {ext.notes && <p className="ext-meta">
                                        <b>Notes: </b>
                                        {ext.notes}
                                    </p>}
                                    <div className="ext-actions">
                                        <button
                                            className="ext-btn ext-btn-accented"
                                            onClick={() => {
                                                window.open("https://t-smod.github.io/scratch-gut/editor.html?extension=" + getCodeUrl(ext.code), "_blank");
                                            }}
                                        >
                                            Open Extension
                                        </button>
                                        <button
                                            className="ext-btn ext-btn-accented"
                                            onClick={() => {
                                                navigator.clipboard.writeText(getCodeUrl(ext.code));
                                                alert("Extension link copied to clipboard!");
                                            }}
                                        >
                                            Copy Link
                                        </button>
                                        <button
                                            className="ext-btn ext-btn-accented"
                                            onClick={() => {
                                                window.open(getCodeUrl(ext.code), "_blank");
                                            }}
                                        >
                                            Open Code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}