'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Moon, Sun } from 'lucide-react'
import { format } from 'date-fns'

const ThemeToggle: React.FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => (
  <Button variant="outline" size="icon" onClick={onToggle} className="absolute top-4 right-4">
    {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
  </Button>
)

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <Card className="bg-opacity-30 backdrop-blur-md bg-primary/20 border-primary/50 text-center p-8">
    <CardHeader>
      <CardTitle className="text-4xl font-bold text-primary">Welcome to DreamScape Oracles</CardTitle>
      <CardDescription className="text-xl text-primary/80">
        {format(new Date(), "MMMM d, yyyy")}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-lg mb-6 text-primary/90">May your dreams reveal the wisdom of the cosmos.</p>
      <Button onClick={onStart} className="bg-primary text-primary-foreground hover:bg-primary/90">
        Start Your Journey
      </Button>
    </CardContent>
  </Card>
)

// Add these type definitions before the component
type SubcategoryInterpretations = {
  [key: string]: string;
};

type DreamInterpretations = {
  [key: string]: SubcategoryInterpretations;
};

// Add this type definition
type DreamCategories = 'Animals' | 'Nature' | 'People' | 'Objects' | 'Actions';

export default function DreamDecoder() {
  const [isDark, setIsDark] = useState<boolean>(false)
  const [showWelcome, setShowWelcome] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>('categories')
  const [selectedCategory, setSelectedCategory] = useState<DreamCategories | ''>('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')
  const [customDream, setCustomDream] = useState<string>('')
  const [interpretation, setInterpretation] = useState<string>('')

  const dreamCategories = ['Animals', 'Nature', 'People', 'Objects', 'Actions']
  const subcategories: Record<DreamCategories, string[]> = {
    Animals: ['Snake', 'Lion', 'Bird', 'Fish', 'Wolf'],
    Nature: ['Forest', 'Ocean', 'Mountain', 'Sky', 'River'],
    People: ['Family', 'Friends', 'Strangers', 'Celebrities', 'Historical Figures'],
    Objects: ['House', 'Vehicle', 'Technology', 'Food', 'Clothing'],
    Actions: ['Flying', 'Falling', 'Running', 'Swimming', 'Fighting']
  }

  const interpretations: DreamInterpretations = {
    Animals: {
      Snake: "Dreaming of a snake often symbolizes hidden fears or transformation. It may represent a challenging situation or person in your life.",
      Lion: "A lion in your dream might represent courage, pride, or leadership. It could be calling you to assert yourself in some area of your life.",
      Bird: "Birds in dreams often symbolize freedom, perspective, or messages from the unconscious. Consider what the bird was doing in your dream.",
      Fish: "Fish can represent spirituality, emotions, or fertility. The condition of the water and the fish's behavior can provide more context.",
      Wolf: "Wolves in dreams might symbolize instincts, freedom, or social connections. They could be calling you to trust your intuition or examine your relationships."
    },
    // Add interpretations for other categories...
  }

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      setInterpretation(
        interpretations[selectedCategory]?.[selectedSubcategory] || 
        "No specific interpretation available for this combination."
      )
    }
  }, [selectedCategory, selectedSubcategory])

  const handleInterpret = () => {
    if (customDream) {
      setInterpretation("Based on your custom dream description, it seems that... [AI-generated interpretation would go here]")
    }
  }

  return (
    <div className={`min-h-screen p-8 transition-colors duration-200 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      
      {showWelcome ? (
        <WelcomeScreen onStart={() => setShowWelcome(false)} />
      ) : (
        <>
          <header className="flex justify-between items-center mb-8">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              Dream Decoder
            </h1>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className={`bg-opacity-30 backdrop-blur-md ${isDark ? 'bg-purple-800/30 border-purple-500/50' : 'bg-purple-200/30 border-purple-300/50'}`}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-purple-300' : 'text-purple-700'}>Dream Interpreter</CardTitle>
                <CardDescription className={isDark ? 'text-purple-400' : 'text-purple-600'}>Explore the meanings behind your dreams</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="custom">Custom Dream</TabsTrigger>
                  </TabsList>
                  <TabsContent value="categories">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {dreamCategories.map((category) => (
                        <Button 
                          key={category} 
                          variant={selectedCategory === category ? "default" : "outline"} 
                          onClick={() => setSelectedCategory(category as DreamCategories)}
                          className={selectedCategory === category ? 'bg-purple-500 text-white' : ''}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                    {selectedCategory && (
                      <div className="mt-4">
                        <h3 className={`mb-2 text-lg font-semibold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>{selectedCategory} Subcategories:</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {subcategories[selectedCategory].map((subcat) => (
                            <Button 
                              key={subcat} 
                              variant="outline" 
                              onClick={() => setSelectedSubcategory(subcat)}
                              className={selectedSubcategory === subcat ? 'bg-purple-500 text-white' : ''}
                            >
                              {subcat}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="custom">
                    <Textarea 
                      placeholder="Describe your dream here..." 
                      value={customDream}
                      onChange={(e) => setCustomDream(e.target.value)}
                      className={`min-h-[150px] ${isDark ? 'bg-purple-900/50 border-purple-500/50' : 'bg-purple-100/50 border-purple-300/50'}`}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" onClick={handleInterpret}>
                  Interpret Dream
                </Button>
              </CardFooter>
            </Card>

            <Card className={`bg-opacity-30 backdrop-blur-md ${isDark ? 'bg-indigo-800/30 border-indigo-500/50' : 'bg-indigo-200/30 border-indigo-300/50'}`}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-indigo-300' : 'text-indigo-700'}>Dream Interpretation</CardTitle>
                <CardDescription className={isDark ? 'text-indigo-400' : 'text-indigo-600'}>Uncover the mysteries of your subconscious</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className={`h-[300px] rounded-md border p-4 ${isDark ? 'bg-indigo-900/50 border-indigo-500/50 text-indigo-100' : 'bg-indigo-100/50 border-indigo-300/50 text-indigo-900'}`}>
                  {interpretation}
                </ScrollArea>
              </CardContent>
            </Card>
          </main>

          <footer className={`mt-12 text-center text-sm ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
            <p>© 2023 Dream Decoder. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  )
}