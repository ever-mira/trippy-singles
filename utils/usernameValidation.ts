export function validateUsername(username: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Mindestlänge und Maximallänge prüfen
  if (username.length < 3) {
    errors.push("Mindestens 3 Zeichen.")
  }
  if (username.length > 24) {
    errors.push("Maximal 24 Zeichen.")
  }

  // Leerzeichen überprüfen
  if (/\s/.test(username)) {
    errors.push("Darf keine Leerzeichen enthalten.")
  }

  // Nur alphanumerische Zeichen, Punkte, Bindestriche und Unterstriche erlauben
  if (!/^[a-zA-Z0-9\.\-\_]+$/.test(username)) {
    errors.push("Nur Punkt, Unterstrich und Bindestrich.")
  }

  return { valid: errors.length === 0, errors }
}
