import { readFileSync, writeFileSync } from 'fs';

const csvPath = './src/data/albums_v2.csv';
const outputPath = './src/data/albums.json';

// Read CSV file
const csvContent = readFileSync(csvPath, 'utf-8');

// Parse CSV - handle quoted fields with newlines
function parseCSV(csv) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentField);
      currentField = '';
    } else if (char === '\n' && !inQuotes) {
      currentLine.push(currentField);
      if (currentLine.length > 1) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = '';
    } else if (char === '\r' && !inQuotes) {
      // Skip carriage returns
    } else {
      currentField += char;
    }
  }

  // Don't forget the last line
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField);
    if (currentLine.length > 1) {
      lines.push(currentLine);
    }
  }

  return lines;
}

const rows = parseCSV(csvContent);
const headers = rows[0];

// Parse rows into album objects
const albums = [];
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  if (row.length < 8) continue;

  const artist = row[0]?.trim() || '';
  const album = row[1]?.trim() || '';
  const slot = parseInt(row[2]?.trim() || '0', 10);
  const genreField = row[3]?.trim() || '';
  const coverArtUrl = row[6]?.trim() || '';
  const tracklistRaw = row[7]?.trim() || '';
  const cdNotes = row[8]?.trim() || '';

  // Extract genre from "Genre: Hip-Hop" format
  const genreMatch = genreField.match(/Genre:\s*(.+)/i);
  const genre = genreMatch ? genreMatch[1].trim() : genreField;

  // Parse tracklist
  const tracks = tracklistRaw.split('\n').map(line => {
    const match = line.match(/^(\d+)\s+(.+?)\s+\((\d+:\d+)\)$/);
    if (match) {
      return {
        number: parseInt(match[1], 10),
        title: match[2].trim(),
        duration: match[3]
      };
    }
    // Fallback for different formats
    const altMatch = line.match(/^(\d+)\s+(.+)$/);
    if (altMatch) {
      return {
        number: parseInt(altMatch[1], 10),
        title: altMatch[2].trim(),
        duration: ''
      };
    }
    return null;
  }).filter(Boolean);

  if (slot > 0 && slot <= 100) {
    const albumObj = {
      id: slot,
      artist,
      album,
      slot,
      genre,
      coverArtUrl,
      tracks
    };
    if (cdNotes) {
      albumObj.cdNotes = cdNotes;
    }
    albums.push(albumObj);
  }
}

// Sort by slot number
albums.sort((a, b) => a.slot - b.slot);

console.log(`Parsed ${albums.length} albums`);

// Write JSON file
writeFileSync(outputPath, JSON.stringify(albums, null, 2));
console.log(`Written to ${outputPath}`);
