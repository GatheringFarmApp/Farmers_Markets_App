// TODO handle environments

const DEFAULT_CONFIG = {
    marketsUrl: 'http://localhost:8010/k8s-first-001/us-central1/getMarkets',
};

import dev from './dev';

const config = { ...DEFAULT_CONFIG, ...dev};

export default config;
