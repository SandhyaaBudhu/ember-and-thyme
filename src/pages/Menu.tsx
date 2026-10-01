import { useEffect, useRef, useState } from 'react'
import { Leaf, SlidersHorizontal, Sprout, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { ButtonLink, Eyebrow } from '../components/UI'
import { menuCategories, menuItems } from '../data/content'
import type { Dietary, MenuCategory } from '../data/content'
import { usePersistentState } from '../hooks/usePersistentState'

const dietaryOptions: Dietary[] = ['Vegetarian', 'Vegan', 'Gluten-free']
export default function MenuPage() {
  const [params, setParams] = useSearchParams()
  const [saved, setSaved] = usePersistentState<MenuCategory>('et-menu-category', 'tasting', (v): v is MenuCategory => menuCategories.some(c => c.id === v))
  const query = params.get('category')
  const active = menuCategories.some(c => c.id === query) ? query as MenuCategory : saved
  const [filter, setFilter] = usePersistentState<Dietary | 'All'>('et-dietary', 'All', (v): v is Dietary | 'All' => v === 'All' || dietaryOptions.some(option => option === v))
  const [ingredientOpen, setIngredientOpen] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const category = menuCategories.find(c => c.id === active)!
  const items = menuItems[active].filter(item => filter === 'All' || item.tags.includes(filter))
  const sections = [...new Set(items.map(item => item.section))]
  useEffect(() => { if (query && menuCategories.some(c => c.id === query)) setSaved(query as MenuCategory) }, [query])
  function changeTab(id: MenuCategory) { setSaved(id); setParams({ category: id }, { replace: true }) }
  return <>
    <section className="page-intro container"><Eyebrow>SPRING 2026 · FRESH PERSPECTIVES</Eyebrow><h1>The season,<br /><em>served thoughtfully.</em></h1><p>Rooted in the Cape. Inspired by what’s growing.<br />A menu that moves with nature.</p></section>
    <section className="container menu-section"><div className="menu-tabs" role="tablist" aria-label="Menu categories">{menuCategories.map((c, i) => <button key={c.id} ref={el => { tabs.current[i] = el }} role="tab" id={`tab-${c.id}`} aria-controls="menu-panel" aria-selected={active === c.id} tabIndex={active === c.id ? 0 : -1} className={active === c.id ? 'active' : ''} onClick={() => changeTab(c.id)} onKeyDown={e => { let target = i; if (e.key === 'ArrowRight') target = (i + 1) % menuCategories.length; else if (e.key === 'ArrowLeft') target = (i + menuCategories.length - 1) % menuCategories.length; else if (e.key === 'Home') target = 0; else if (e.key === 'End') target = menuCategories.length - 1; else return; e.preventDefault(); changeTab(menuCategories[target].id); tabs.current[target]?.focus() }}>{c.label}</button>)}</div>
    <div className="dietary-bar"><span><SlidersHorizontal size={16} />YOUR PREFERENCES</span><div className="dietary-filters">{(['All', ...dietaryOptions] as const).map(option => <button key={option} className={filter === option ? 'active' : ''} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option !== 'All' && <Leaf size={13} />}{option === 'All' ? 'All dishes' : option}</button>)}</div></div>
    <div className="menu-layout"><div role="tabpanel" id="menu-panel" aria-labelledby={`tab-${active}`} tabIndex={0}><div className="menu-panel-heading"><h2>{category.label}</h2><p>{category.intro}</p></div>{items.length === 0 ? <div className="empty-state"><Leaf size={32} /><h3>A different kind of appetite?</h3><p>No dishes match this preference in this category. Explore another menu, or see all dishes.</p><button className="button" onClick={() => setFilter('All')}>Clear preference<X size={16} /></button></div> : sections.map(section => <div className="menu-group" key={section}><p className="small-label">{section}</p>{items.filter(item => item.section === section).map(item => <article className="menu-item" key={item.name}><div><h3>{item.name}</h3><p>{item.description}</p><div className="item-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><span className="menu-price">R{item.price.toLocaleString('en-ZA')}</span></article>)}</div>)}<p className="menu-disclaimer">All prices in South African rand. Our menu changes with the season.<br />Please tell us about allergies when booking; our kitchen handles common allergens.</p></div><aside className="ingredient-note"><Sprout size={38} strokeWidth={1} /><span className="small-label">IN SEASON, IN OUR KITCHEN</span><h3>{category.ingredient}</h3><p>{category.note}</p><div className="ingredient-rule" /><span>FROM NEARBY.<br />NEVER BY ACCIDENT.</span><button className="text-link ingredient-toggle" onClick={() => setIngredientOpen(!ingredientOpen)} aria-expanded={ingredientOpen}>{ingredientOpen ? 'A little less' : 'A little more'}<span>{ingredientOpen ? '−' : '+'}</span></button>{ingredientOpen && <div className="ingredient-extra">We work directly with our growers, planning around each harvest. If something isn’t at its best, we wait. That’s why no two visits are quite the same.</div>}</aside></div></section>
    <section className="menu-bottom container"><Eyebrow>THE BEST PART IS SHARING IT</Eyebrow><h2>Your next favourite evening<br /><em>starts at the table.</em></h2><ButtonLink to="/reservations">Reserve a table</ButtonLink></section>
  </>
}
