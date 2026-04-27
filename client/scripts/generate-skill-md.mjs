import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function parseEnvFile(content) {
	const result = {};
	const lines = content.split(/\r?\n/);

	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;

		const eqIndex = trimmed.indexOf('=');
		if (eqIndex <= 0) continue;

		const key = trimmed.slice(0, eqIndex).trim();
		let value = trimmed.slice(eqIndex + 1).trim();

		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		result[key] = value;
	}

	return result;
}

function loadEnvValue(key) {
	if (process.env[key]) return process.env[key];

	const envCandidates = ['.env.local', '.env'];
	for (const envFile of envCandidates) {
		const envPath = path.join(rootDir, envFile);
		if (!fs.existsSync(envPath)) continue;

		const parsed = parseEnvFile(fs.readFileSync(envPath, 'utf8'));
		if (parsed[key]) return parsed[key];
	}

	return '';
}

function normalizeUrl(url) {
	return url.replace(/\/+$/, '');
}

const apiBaseUrl = normalizeUrl(
	loadEnvValue('VITE_BACKEND_URL') || 'https://proofline.xyz/api/v1'
);
const homepageUrl = normalizeUrl(
	loadEnvValue('VITE_FRONTEND_URL') || 'https://proofline.xyz'
);

const templatePath = path.join(rootDir, 'public', 'skill.template.md');
const outputPath = path.join(rootDir, 'public', 'skill.md');

if (!fs.existsSync(templatePath)) {
	throw new Error(`Missing template file: ${templatePath}`);
}

const template = fs.readFileSync(templatePath, 'utf8');
const output = template
	.replaceAll('__API_BASE_URL__', apiBaseUrl)
	.replaceAll('__HOMEPAGE_URL__', homepageUrl);

fs.writeFileSync(outputPath, output, 'utf8');
console.log(
	`Generated skill.md with API base: ${apiBaseUrl} and homepage: ${homepageUrl}`
);
