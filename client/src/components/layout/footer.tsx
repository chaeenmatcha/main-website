import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-secondary/10 pt-20 pb-10 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-6">CHAEEN MATCHA</h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Premium Ceremonial Grade A matcha sourced directly from Shizuoka, Japan. 
              Elevate your daily ritual with pure, antioxidant-rich green tea.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-semibold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CHAEEN MATCHA. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
