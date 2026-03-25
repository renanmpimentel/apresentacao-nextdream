import Presentation, { PresentationExport } from './presentation/Presentation';

export default function App() {
  const params = new URLSearchParams(window.location.search);

  if (params.get('export') === 'pdf') {
    return <PresentationExport />;
  }

  return <Presentation />;
}
