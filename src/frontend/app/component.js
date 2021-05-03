import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';

export function App() {
    const app = document.createDocumentFragment();

    app.append(Header(), Main(), Footer());

    return app;
}