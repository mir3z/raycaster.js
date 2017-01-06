export function createAssetStore() {

    const repo = {};

    return {
        load(assets) {
            const registerAs = key => asset => repo[key] = asset;
            const load = ({ key, loader }) => loader().then(registerAs(key));

            return Promise.all(assets.map(load));
        },
        
        provide(key) {
            const asset = repo[key];

            if (!asset) {
                throw `No asset known as "${key}"`;
            }

            return asset;
        }
    };
}


