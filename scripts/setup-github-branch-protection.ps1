# One-time setup: protect `main` (PR required, no direct push).
# Prerequisites: GitHub CLI — run `gh auth login` once.
$ErrorActionPreference = "Stop"
$Repo = "saloniagaetano767-svg/gaetano-salonia-portfolio"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI (gh) is not installed. Install from https://cli.github.com/"
}

gh auth status 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Not logged in. Run: gh auth login"
}

$body = @{
  required_pull_request_reviews = @{
    required_approving_review_count = 0
    dismiss_stale_reviews           = $false
    require_code_owner_reviews      = $false
  }
  enforce_admins                  = $true
  required_status_checks          = $null
  restrictions                    = $null
  required_linear_history         = $false
  allow_force_pushes              = $false
  allow_deletions                 = $false
} | ConvertTo-Json -Depth 5 -Compress

$body | gh api "repos/$Repo/branches/main/protection" --method PUT --input -

Write-Host "Branch protection enabled for main."
