
import { PDFDocumentProxy } from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Function to load a PDF file
export const loadPDF = async (file: File): Promise<PDFDocumentProxy> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    return pdf;
  } catch (error) {
    console.error('Error loading PDF:', error);
    throw new Error('Failed to load PDF file');
  }
};

// Function to extract text from all pages of a PDF
export const extractTextFromPDF = async (pdf: PDFDocumentProxy): Promise<string> => {
  let fullText = '';
  
  try {
    // Get the total number of pages
    const numPages = pdf.numPages;
    
    // Extract text from each page
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Add null check for textContent.items
      const items = textContent?.items || [];
      const pageText = items
        .map((item: any) => item?.str || '')
        .join(' ');
      
      fullText += pageText + '\n';
    }
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
  
  return fullText;
};

// Main function to load and extract text from a PDF file
export const parsePDF = async (file: File): Promise<string> => {
  if (!file) {
    console.error('No file provided to parsePDF');
    return '';
  }
  
  try {
    const pdf = await loadPDF(file);
    const text = await extractTextFromPDF(pdf);
    return text || '';
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
};
