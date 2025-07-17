
import { ActionType } from '../types/actionTypes';

export const createActionHandler = (
  action: ActionType,
  itemId: string = '',
  itemTitle: string = '',
  data?: any,
  onClick?: () => void
) => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`ActionButton clicked: ${action}`, { itemId, itemTitle, data });
    
    if (onClick) {
      onClick();
      return;
    }

    const handlers = (window as any).actionHandlers;
    if (!handlers) {
      console.warn('Action handlers not available');
      return;
    }

    switch (action) {
      case 'lire':
      case 'pdf':
      case 'voir':
      case 'consulter':
      case 'détails':
        handlers.handlePDFView(itemTitle || 'Document', data?.pdfUrl);
        break;
      case 'partager':
      case 'partager-ressource':
        handlers.handleShare(itemTitle || 'Contenu', data?.url);
        break;
      case 'filtres':
      case 'filtrer-date':
        handlers.handleFilter(data?.type || 'general');
        break;
      case 'télécharger':
      case 'télécharger-pdf':
        handlers.handleDownload(itemTitle || 'document.pdf', data?.url);
        break;
      case 'comparer':
      case 'comparer-textes':
        handlers.handleComparison(data?.items || []);
        break;
      case 'signaler':
        handlers.handleFeedback('error', itemTitle);
        break;
      case 'avis':
        handlers.handleFeedback('feedback', itemTitle);
        break;
      case 'témoignage':
        handlers.handleFeedback('testimonial', itemTitle);
        break;
      case 'import':
      case 'import-lot':
      case 'import-zip':
      case 'import-csv':
      case 'import-excel':
      case 'import-json':
        handlers.handleImport(data?.acceptedTypes || ['.pdf', '.doc', '.docx']);
        break;
      case 'exporter':
      case 'export-excel':
      case 'export-json':
      case 'export-word':
      case 'export-pdf':
      case 'exporter-analyse':
        handlers.handleExport(data?.items || [], itemTitle);
        break;
      case 'examiner':
        handlers.handleExamine(itemId, itemTitle);
        break;
      case 'rejeter':
        handlers.handleReject(itemId, itemTitle);
        break;
      case 'approuver':
        handlers.handleApprove(itemId, itemTitle);
        break;
      case 'aimer':
      case 'like':
      case 'favoris':
        handlers.handleLike(itemId, itemTitle);
        break;
      case 'nouveau':
      case 'nouveau-modèle':
      case 'nouveau-projet':
      case 'nouveau-sujet':
      case 'nouveau-tag':
      case 'nouveau-template':
      case 'nouveau-workflow':
      case 'nouvel-utilisateur':
      case 'nouvelle-alerte':
      case 'nouvelle-permission':
      case 'nouvelle-politique':
        handlers.handleAddLegalText();
        break;
      case 'ajouter-domaine':
      case 'ajouter-type':
      case 'ajouter-catégorie':
      case 'ajouter-organisation':
      case 'ajouter-source':
        handlers.handleManagement(action.replace('ajouter-', ''));
        break;
      default:
        console.log(`Action ${action} triggered for:`, { itemId, itemTitle, data });
    }
  };
};
